const mongoose = require("mongoose");

const organisationSchema = mongoose.Schema({
  siret: String,
  nomSociete: String,
  nomEnseigne: String,
  adresseSociete: {
    numeroVoie: String,
    typeVoie: String,
    libelleVoie: String,
    CP: String,
    ville: String,
  },
  telephone: String,
  proprietaire: String, // En attendant de lier avec BDD users
  // proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  categorie: String,
});

const Organisation = mongoose.model("organisations", organisationSchema);

module.exports = Organisation;
