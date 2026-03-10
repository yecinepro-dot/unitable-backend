var express = require("express");
var router = express.Router();
const Team = require("../models/teams");

// Push une team
router.post("/addteams", async (req, res) => {
  try {
    const { organizationId } = req.body;
    const equipes = req.body.equipes || req.body.teams;

    // Double check en plus du front
    if (!organizationId || !equipes || !equipes.length) {
      return res
        .status(400)
        .json({ success: false, result: false, message: "Données manquantes" });
    }

    const newTeam = new Team({
      organization: organizationId,
      equipes,
    });

    await newTeam.save();

    res.json({
      success: true,
      result: true,
      message: "Équipe(s) enregistrée(s) avec succès !",
      team: newTeam,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: false, message: err.message });
  }
});

// GET Récupérer les équipes d'un restaurant
router.get("/:organizationId", async (req, res) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      return res
        .status(400)
        .json({ success: false, result: false, message: "Impossible de trouver le restaurant" });
    }

    const teams = await Team.findOne({ organization: organizationId });

    if (!teams) {
      return res.status(404).json({
        success: false,
        result: false,
        message: "Aucune équipe trouvée pour ce restaurant",
      });
    }

    res.json({ success: true, result: true, teams: teams.equipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: false, message: err.message });
  }
});

module.exports = router;
