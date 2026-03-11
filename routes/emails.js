var express = require("express");
var router = express.Router();
require("../models/connection");
const jwt = require("jsonwebtoken");

const axios = require("axios");

/*créer une route POST /api/brevo/send pour envoyer un email via l'API Brevo. Le corps de la requête doit contenir les champs suivants : toEmail, subject, htmlContent ou textContent, et tags (optionnel). La route doit valider les champs requis, construire le payload pour l'API Brevo, et gérer les réponses et erreurs de manière appropriée.*/

router.post("/resetpassword", async (req, res) => {
	try {
		const { toEmail, toName, tags = [] } = req.body;
		const resetToken = jwt.sign(
			{ email: toEmail },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);

		const resetLink = `${process.env.URL_FRONTEND}/forgetPassword?token=${resetToken}`; // Générer dynamiquement en fonction de votre logique d'application
		const htmlContent = `<h1>Réinitialisation de votre mot de passe Unitable</h1> <p>Bonjour ${toName || ""},</p><p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p><a href="${resetLink}">Réinitialiser mon mot de passe</a><p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>`;
		const textContent = `Réinitialisation de votre mot de passe Unitable Bonjour ${toName || ""}, Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe : ${resetLink} Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.`;
		const subject = "Réinitialisation de votre mot de passe Unitable";

		if (!toEmail) {
			return res.status(400).json({
				error: "Champs requis: toEmail",
				debug: {
					contentType: req.headers["content-type"],
					body: req.body,
					originalUrl: req.originalUrl,
				},
			});
		}
		const payload = {
			sender: {
				name: process.env.BREVO_SENDER_NAME || "Contact Unitable",
				email: process.env.BREVO_SENDER_EMAIL || "contact@unitable.fr",
			},
			to: [{ email: toEmail, name: toName || "" }],
			subject,
			htmlContent: htmlContent || undefined,
			textContent: textContent || undefined,
			tags,
		};
		const brevoRes = await axios.post(
			"https://api.brevo.com/v3/smtp/email",
			payload,
			{
				headers: {
					accept: "application/json",
					"content-type": "application/json",
					"api-key": process.env.BREVO_API_KEY,
				},
				timeout: 15000,
			},
		);
		return res.status(200).json({
			ok: true,
			brevo: brevoRes.data,
		});
	} catch (err) {
		const status = err.response?.status || 500;
		const data = err.response?.data || { message: err.message };

		return res.status(status).json({
			ok: false,
			error: data,
		});
	}
});

router.post("/welcome", async (req, res) => {
	try {
		const { toEmail, toName, tags = [] } = req.body;

		if (!toEmail || !subject || (!htmlContent && !textContent)) {
			return res.status(400).json({
				error: "Champs requis: toEmail, subject, et htmlContent ou textContent",
			});
		}
		const htmlContent = `<h1>Bienvenue chez Unitable</h1> <p>Bonjour ${{ contactName }},</p><p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p><a href="${{ resetLink }}">Réinitialiser mon mot de passe</a><p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>`;
		const textContent = `Bienvenue chez Unitable Bonjour ${{ contactName }}`;
		const subject = "Bienvenue chez Unitable";
		const payload = {
			sender: {
				name: process.env.BREVO_SENDER_NAME || "Contact Unitable",
				email: process.env.BREVO_SENDER_EMAIL || "contact@unitable.fr",
			},
			to: [{ email: toEmail, name: toName || "" }],
			subject,
			htmlContent: htmlContent || undefined,
			textContent: textContent || undefined,
			tags,
		};

		const brevoRes = await axios.post(
			"https://api.brevo.com/v3/smtp/email",
			payload,
			{
				headers: {
					accept: "application/json",
					"content-type": "application/json",
					"api-key": process.env.BREVO_API_KEY,
				},
				timeout: 15000,
			},
		);

		return res.status(200).json({
			ok: true,
			brevo: brevoRes.data,
		});
	} catch (err) {
		const status = err.response?.status || 500;
		const data = err.response?.data || { message: err.message };

		return res.status(status).json({
			ok: false,
			error: data,
		});
	}
});

router.post("/invitation", async (req, res) => {
	try {
		const { toEmail, toName } = req.body;
		const resetToken = jwt.sign(
			{ email: toEmail },
			process.env.JWT_SECRET,
			{
				expiresIn: "48h",
			},
		);

		const resetLink = `${process.env.URL_FRONTEND}/forgetPassword?token=${resetToken}`; // Générer dynamiquement en fonction de votre logique d'application
		const htmlContent = `<h1>Bienvenur sur UniTable</h1> <p>Bonjour ${toName || ""},</p><p>Vous avez été invité pour rejoindre l'équipe Unitable. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p><a href="${resetLink}">Réinitialiser mon mot de passe</a><p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>`;
		const textContent = `Bienvenue sur UniTable Bonjour ${toName || ""}, Vous avez été invité pour rejoindre l'équipe Unitable. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe : ${resetLink} `;
		const subject = "Bienvenue sur UniTable";

		if (!toEmail) {
			return res.status(400).json({
				error: "Champs requis: toEmail",
				debug: {
					contentType: req.headers["content-type"],
					body: req.body,
					originalUrl: req.originalUrl,
				},
			});
		}
		const payload = {
			sender: {
				name: process.env.BREVO_SENDER_NAME || "Contact Unitable",
				email: process.env.BREVO_SENDER_EMAIL || "contact@unitable.fr",
			},
			to: [{ email: toEmail, name: toName || "" }],
			subject,
			htmlContent: htmlContent || undefined,
			textContent: textContent || undefined,
		};
		const brevoRes = await axios.post(
			"https://api.brevo.com/v3/smtp/email",
			payload,
			{
				headers: {
					accept: "application/json",
					"content-type": "application/json",
					"api-key": process.env.BREVO_API_KEY,
				},
				timeout: 15000,
			},
		);
		return res.status(200).json({
			ok: true,
			brevo: brevoRes.data,
		});
	} catch (err) {
		const status = err.response?.status || 500;
		const data = err.response?.data || { message: err.message };

		return res.status(status).json({
			ok: false,
			error: data,
		});
	}
});

module.exports = router;
