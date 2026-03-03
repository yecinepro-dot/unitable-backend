var express = require("express");
var router = express.Router();
const Service = require("../models/services");
const { checkBody } = require("../modules/checkBody");

// GET tous les services d'un restaurant avec son id
router.get("/:restaurantId", async (req, res) => {
  try {
    const services = await Service.find({
      restaurant: req.params.restaurantId,
    });

    if (!services) {
      return res.json({
        result: false,
        message: "Aucun service trouvé pour ce restaurant",
      });
    }

    res.json({ result: true, services });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

// POST pour créer un service
router.post("/new", async (req, res) => {
  try {
    if (
      !checkBody(req.body, [
        "name",
        "startTime",
        "endTime",
        "dayOfWeek",
        "restaurant",
      ])
    ) {
      res.json({ result: false, message: "Veuillez remplir tous les champs" });
      return;
    }

    const { name, startTime, endTime, dayOfWeek, restaurant } = req.body;

    const newService = new Service({
      name,
      startTime,
      endTime,
      dayOfWeek,
      restaurant,
    });

    const savedService = await newService.save();
    res.json({ result: true, service: savedService });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

// PUT pour modifier un service
router.put("/edit/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.json({ result: false, message: "Service non trouvé" });
    }

    const { name, startTime, endTime, dayOfWeek } = req.body;

    if (name) service.name = name;
    if (startTime) service.startTime = startTime;
    if (endTime) service.endTime = endTime;
    if (dayOfWeek) service.dayOfWeek = dayOfWeek;

    const updatedService = await service.save();
    res.json({
      result: true,
      service: updatedService,
      message: "Service mis à jour avec succès",
    });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

// DELETE pour supprimer un service
router.delete("/delete/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.json({ result: false, message: "Service non trouvé" });
    }

    await Service.deleteOne({ _id: req.params.id });
    res.json({ result: true, message: "Service supprimé avec succès" });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

module.exports = router;
