var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/signup", (req, res) => {
	if (!checkBody(req.body, ["email", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" });
		return;
	}

	// Check if the user has not already been registered
	User.findOne({ email: req.body.email }).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10);

			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: hash,
				email: req.body.email,
				token: uid2(32),
				secuNumber: req.body.secuNumber,
				birthDate: req.body.birthDate,
				address: req.body.address,
				phone: req.body.phone,
				position: req.body.position,
				profil: req.body.profil,
				dateContract: req.body.dateContract,
				typeContract: req.body.typeContract,
				hourVolumn: req.body.hourVolumn,
				contact: req.body.contact,
				organisationName: req.body.organisationName,
				isAdmin: req.body.isAdmin,
				firstConnection: req.body.firstConnection,
			});

			/*Contact Urgent: 
    Nom 
    Prénom  
    Numéro Téléphone

*/

			newUser.save().then((newDoc) => {
				res.json({ result: true, token: newDoc.token });
			});
		} else {
			// User already exists in database
			res.json({ result: false, error: "User already exists" });
		}
	});
});

router.post("/signin", (req, res) => {
	if (!checkBody(req.body, ["email", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" });
		return;
	}

	User.findOne({ email: req.body.email }).then((data) => {
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({ result: true, token: data.token });
		} else {
			res.json({
				result: false,
				error: "User not found or wrong password",
			});
		}
	});
});

router.post("/employee", async (req, res) => {
	console.log("REQ.BODY:", req.body);
	try {
		const {
			firstName,
			lastName,
			email,
			address,
			phone,
			position,
			profil,
			birthDate,
			secuNumber,
			dateContract,
			typeContract,
			hourVolumn,
			contact,
		} = req.body;

		// On check si ces champs sont remplis
		if (!email || !firstName || !lastName) {
			return res.status(400).json({
				result: false,
				error: "Missing required fields",
			});
		}

		// Check si l'employé existe déjà
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.json({ result: false, error: "User already exists" });
		}

		// On génère un mot de passe temporaire
		const tempPassword = uid2(8);
		const hash = bcrypt.hashSync(tempPassword, 10);

		const newEmployee = new User({
			firstName,
			lastName,
			email,
			password: hash,
			token: uid2(32),
			address,
			phone,
			position,
			profil,
			birthDate,
			secuNumber,
			dateContract,
			typeContract,
			hourVolumn,
			contact,
			isAdmin: profil === "admin",
			firstConnection: true,
		});

		const savedEmployee = await newEmployee.save();

		res.status(201).json({
			result: true,
			message: "Employee created successfully",
			tempPassword,
		});
	} catch (error) {
		// console.error(error);
		// res.status(500).json({
		// 	result: false,
		// 	error: "Server error",
		// });
		console.error("ERREUR EMPLOYEE:", error.message);
		res.status(500).json({ result: false, error: error.message });
	}
});

module.exports = router;
