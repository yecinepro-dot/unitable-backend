var express = require("express");
var router = express.Router();
const Team = require("../models/teams");
const { checkBody } = require("../modules/checkBody");

// Pussh une team
router.post("/", async (req, res) => {
	try {
		const { organizationId, equipes } = req.body;

		// Double check en plus du front
		if (!organizationId || !equipes || !equipes.length) {
			return res.json({ result: false, message: "Données manquantes" });
		}

		const newTeam = new Team({
			organization: organizationId,
			equipes,
		});

		await newTeam.save();

		res.json({
			success: true,
			message: "Équipe(s) enregistrée(s) avec succès !",
			team: newTeam,
		});
	} catch (err) {
		console.error(err);
		res.json({ result: false, message: err.message });
	}
});

module.exports = router;
