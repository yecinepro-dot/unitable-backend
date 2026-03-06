var express = require("express");
var router = express.Router();
const Organization = require("../models/organizations");
const User = require("../models/users");
const CT = require("../models/CT");
const { checkBody } = require("../modules/checkBody");

// GET /all - Récupérer tous les CT d'un restaurant
router.get("/all", async (req, res) => {
  const { idRestaurant } = req.body;
  try {
    const response = await CT.find({ restaurant: idRestaurant });

    if (!response) {
      return res.status(404).json({
        result: false,
        message:
          "Pas de créneaux de travail pour votre restaurant, créez le premier !",
      });
    }

    res
      .status(200)
      .json({ result: true, message: "CT récupérés pour le restaurant" });
    console.log("✅ CT récupérés");
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
    console.log("❌ Problème récupération CT : ", err.message);
  }
});

// POST CT pour un user
router.post("/create", async (req, res) => {
  const {
    date,
    startTime,
    endTime,
    pause,
    worker,
    role,
    checkArrival,
    checkDeparture,
    restaurant,
    createdBy,
  } = req.body;
  try {
    if (
      !checkBody(req.body, [
        "date",
        "startTime",
        "endTime",
        "pause",
        "worker",
        "restaurant",
        "createdBy",
      ])
    ) {
      res
        .status(400)
        .json({
          result: false,
          message: "Merci de remplir tous les champs obligatoires.",
        });
    }

    const newCT = new CT({
      date,
      startTime,
      endTime,
      pause,
      worker,
      role,
      checkArrival,
      checkDeparture,
      restaurant,
      createdBy,
    });

    const savedCT = await newCT.save();

    if (!savedCT) {
      res
        .status(418)
        .json({
          result: false,
          message: "Problème lors de l'ajout du CT en BDD",
        });
      console.log("❌ Problème sauvegarde CT : ", err.message);
    }

    res.status(201).json({ result: true, message: "CT ajouté avec succès" });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
    console.log("❌ Problème création CT : ", err.message);
  }
});

// DELETE un CT

// PUT Modifier un CT

// GET CT d'un seul user

// GET CT par rôle

// GET CT par équipe

module.exports = router;
