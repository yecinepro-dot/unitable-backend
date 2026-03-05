const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
  siret: String,
  businessName: String,
  businessCommercialName: String,
  businessAddress: {
    number: String,
    streetType: String,
    streetName: String,
    zipCode: String,
    city: String,
    coordonnee1: String, // Si utilisation géolocalisation
    coordonnee2: String,
  },
  phoneNumber: String,
  category: String,
  owner: String, // En attendant de lier avec BDD users
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
