var express = require("express");
var router = express.Router();
const CT = require("../models/CT");
const { checkBody } = require("../modules/checkBody");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

// GET /all - Récupérer tous les CT d'un restaurant
router.get("/all/:idRestaurant", async (req, res) => {
  const { idRestaurant } = req.params;

  if (!idRestaurant) {
    return res
      .status(400)
      .json({ result: false, message: "Restaurant non identifié" });
  }
  try {
    const foundCTs = await CT.find({ restaurant: idRestaurant })
      .populate("restaurant", "businessCommercialName")
      .populate("worker", "firstName lastName")
      .populate("createdBy", "firstName lastName");

    res.status(200).json({
      result: true,
      message:
        foundCTs.length < 0
          ? "CT récupérés pour le restaurant"
          : "Pas de CT pour ce restaurant",
      foundCTs,
    });
    // console.log("✅ CT récupérés");
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
    // console.log("❌ Problème récupération CT : ", err.message);
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
  // Assurer que la date récupérée soit au bon format pour la BDD pour avoir le bon jour
  const formattedDate = dayjs(date, "DD/MM/YYYY")
    .startOf("day")
    .add(12, "hours") // On vise midi pour éviter le piège des fuseaux horaires
    .toDate();
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
      return res.status(400).json({
        result: false,
        message: "Merci de remplir tous les champs obligatoires.",
      });
    }

    const newCT = new CT({
      date: formattedDate,
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
      console.log("❌ Problème sauvegarde CT : ", err.message);
      return res.status(418).json({
        result: false,
        message: "Problème lors de l'ajout du CT en BDD",
      });
    }

    const fullCT = await CT.findById(savedCT._id)
      .populate("worker", "firstName lastName")
      .populate("restaurant", "businessCommercialName")
      .populate("createdBy", "firstName lastName");

    res
      .status(201)
      .json({ result: true, message: "CT ajouté avec succès", fullCT });
  } catch (err) {
    console.log("❌ Problème création CT : ", err.message);
    return res.status(500).json({ result: false, message: err.message });
  }
});

// DELETE un CT
router.delete("/delete/:idCT", async (req, res) => {
  const { idCT } = req.params;
  try {
    const CTToDelete = await CT.findByIdAndDelete(idCT);

    if (!CTToDelete) {
      return res
        .status(404)
        .json({ result: false, message: "CT non trouvé, rien à supprimer" });
    }
  } catch (err) {
    return res.status(500).json({ result: false, message: err.message });
  }

  res.status(202).json({ result: true, message: "CT supprimé" });
});

// PUT Modifier un CT
router.put("/update/:idCT", async (req, res) => {
  const { date, startTime, endTime, pause, worker, role } = req.body;
  const { idCT } = req.params;
  const formattedDate = dayjs(date, "DD/MM/YYYY")
    .startOf("day")
    .add(12, "hours") // On vise midi pour éviter le piège des fuseaux horaires
    .toDate();

  const CTToUpdate = {
    date: formattedDate,
    startTime,
    endTime,
    pause,
    worker,
    role,
  };

  try {
    const updatedCT = await CT.findByIdAndUpdate(idCT, CTToUpdate, {
      new: true,
    }).populate("worker", "firstName lastName");

    if (!updatedCT) {
      return res
        .status(404)
        .json({ result: false, message: "Pas de CT à modifier" });
    }

    res.status(200).json({ result: true, updatedCT });
  } catch (err) {
    return res.status(500).json({ result: false, message: err.message });
  }
});

// GET CT d'un seul user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const foundCTs = await CT.find({ worker: userId })
      .populate("worker", "firstName lastName")
      .populate("createdBy", "firstName lastName")
      .populate("restaurant", "businessCommercialName");

    if (!foundCTs || foundCTs.length === 0) {
      return res.status(404).json({
        result: false,
        message: "Pas de CT pour cet.te utilisateur.ice",
      });
    }

    res.status(200).json({ result: true, foundCTs });
  } catch (err) {
    return res.status(500).json({ result: false, message: err.message });
  }
});

// GET CT par rôle
router.get("/role/:restaurantId/:roleName", async (req, res) => {
  const { restaurantId, roleName } = req.params;

  try {
    const foundCTs = await CT.find({
      role: { $regex: roleName, $options: "i" },
      restaurant: restaurantId,
    })
      .populate("worker", "firstName lastName")
      .populate("createdBy", "firstName lastName")
      .populate("restaurant", "businessCommercialName");

    if (!foundCTs || foundCTs.length === 0) {
      return res.status(404).json({
        result: false,
        message: "Pas de CT pour ce rôle",
      });
    }

    res.status(200).json({ result: true, foundCTs });
  } catch (err) {
    return res.status(500).json({ result: false, message: err.message });
  }
});

// GET CT par équipe
// router.get("/team/:restaurantId/:teamName", async (req, res) => {
//   const { restaurantId, teamName } = req.params;

//   const foundCTs = await CT.find({
//     teams: { $regex: teamName, $options: "i" },
//     restaurant: restaurantId,
//   })
//     .populate("worker", "firstName lastName")
//     .populate("createdBy", "firstName lastName")
//     .populate("restaurant", "businessCommercialName");
//   // .populate("teams", "teamName");

//   if (!foundCTs || foundCTs.length === 0) {
//     return res.status(404).json({
//       result: false,
//       message: "Pas de CT pour cette équipe",
//     });
//   }

//   res.status(200).json({ result: true, foundCTs });
// });

module.exports = router;
