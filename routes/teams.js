var express = require("express");
var router = express.Router();
const Team = require("../models/teams");
const { checkBody } = require("../modules/checkBody");

// Push une team
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

// GET Récupérer les équipes d'un restaurant
router.get("/:organizationId", async (req, res) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      return res.json({
        result: false,
        message: "Impossible de trouver le restaurant",
      });
    }

    const teams = await Team.findOne({ organization: organizationId });

    if (!teams) {
      return res.json({
        result: false,
        message: "Aucune équipe trouvée pour ce restaurant",
      });
    }

    res.json({ result: true, teams: teams.equipes });
  } catch (err) {
    console.error(err);
    res.json({ result: false, message: err.message });
  }
});

module.exports = router;
