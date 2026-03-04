var express = require("express");
var router = express.Router();
const Organization = require("../models/organizations");
const { checkBody } = require("../modules/checkBody");

// Obtenir toutes les informations du restaurant avec son siret
router.get("/:siret", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.insee.fr/api-sirene/3.11/siret/${req.params.siret}`,
      {
        headers: { "X-INSEE-Api-Key-Integration": process.env.SIRENE_API_KEY },
      },
    );

    if (!response.ok) {
      res.json({ result: false, error });
    }

    const data = await response.json();

    const restaurant = {
      siret: data.etablissement.siret,
      businessName: data.etablissement.uniteLegale.denominationUniteLegale,
      businessCommercialName:
        data.etablissement.uniteLegale.denominationUsuelle1UniteLegale,
      businessAddress: {
        number: data.etablissement.adresseEtablissement.numeroVoieEtablissement,
        streetType:
          data.etablissement.adresseEtablissement.typeVoieEtablissement,
        streetName:
          data.etablissement.adresseEtablissement.libelleVoieEtablissement,
        zipCode:
          data.etablissement.adresseEtablissement.codePostalEtablissement,
        city: data.etablissement.adresseEtablissement
          .libelleCommuneEtablissement,
        coordonnee1:
          data.etablissement.adresseEtablissement
            .coordonneeLambertAbscisseEtablissement,
        coordonnee2:
          data.etablissement.adresseEtablissement
            .coordonneeLambertOrdonneeEtablissement,
      },
    };

    res.json({ result: true, restaurant });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
});

// Enregistrer un restaurant en BDD
router.post("/", async (req, res) => {
  try {
    if (
      !checkBody(req.body, [
        "siret",
        "businessName",
        "businessCommercialName",
        "phoneNumber",
      ])
    ) {
      res.json({ result: false, message: "Il manque des champs obligatoires" });
      return;
    }

    const {
      siret,
      businessName,
      businessCommercialName,
      businessAddress,
      phoneNumber,
      owner,
      category,
    } = req.body;

    const checkBDD = await Organization.findOne({ siret });
    if (checkBDD) {
      res.json({
        result: false,
        message: "Votre SIRET est déjà enregistré ! Vérifiez son exactitude.",
      });
      return;
    }

    const newRestaurant = new Organization({
      siret: siret,
      businessName: businessName,
      businessCommercialName: businessCommercialName,
      businessAddress: businessAddress,
      phoneNumber: phoneNumber,
      owner: owner, // À récupérer dans le front avec token, "TEST" pour l'instant
      category: category,
    });

    newRestaurant.save();

    res.json({
      result: true,
      message: "Restaurant enregistré avec succès",
      id: newRestaurant._id,
    });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

module.exports = router;
