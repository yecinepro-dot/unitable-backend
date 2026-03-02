var express = require("express");
var router = express.Router();
const Organisation = require("../models/organisations");
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
      nomSociete: data.etablissement.uniteLegale.denominationUniteLegale,
      nomCommercial:
        data.etablissement.uniteLegale.denominationUsuelle1UniteLegale,
      adresse: {
        numeroVoie:
          data.etablissement.adresseEtablissement.numeroVoieEtablissement,
        typeVoie: data.etablissement.adresseEtablissement.typeVoieEtablissement,
        libelleVoie:
          data.etablissement.adresseEtablissement.libelleVoieEtablissement,
        CP: data.etablissement.adresseEtablissement.codePostalEtablissement,
        ville:
          data.etablissement.adresseEtablissement.libelleCommuneEtablissement,
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
      !checkBody(req.body, ["siret", "nomSociete", "nomEnseigne", "telephone"])
    ) {
      res.json({ result: false, message: "Il manque des champs obligatoires" });
      return;
    }

    const {
      siret,
      nomSociete,
      nomEnseigne,
      adresseSociete,
      telephone,
      proprietaire,
      categorie,
    } = req.body;
    const newRestaurant = new Organisation({
      siret: siret,
      nomSociete: nomSociete,
      nomEnseigne: nomEnseigne,
      adresseSociete: {
        numeroVoie: adresseSociete.numeroVoie,
        typeVoie: adresseSociete.typeVoie,
        libelleVoie: adresseSociete.libelleVoie,
        CP: adresseSociete.codePostal,
        ville: adresseSociete.ville,
      },
      telephone: telephone,
      proprietaire: proprietaire, // À récupérer dans le front avec token
      categorie: categorie,
    });

    newRestaurant.save();

    res.json({ result: true, message: "Restaurant enregistré avec succès" });
  } catch (err) {
    res.json({ result: false, message: err.message });
  }
});

module.exports = router;
