const mongoose = require("mongoose");

// Rôle : nom et besoin en personnel
const roleSchema = mongoose.Schema({
  name: { type: String, required: true },
  need: { type: Number, required: true, default: 0 },
});

// Équipe : nom et rôles associés
const teamSchema = mongoose.Schema({
  teamName: { type: String, required: true },
  roles: [roleSchema],
});

// Service complet incluant les schémas précédents
const serviceSchema = mongoose.Schema({
  name: String,
  startTime: Number,
  endTime: Number,
  dayOfWeek: [
    {
      type: String,
      enum: [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ],
    },
  ],
  equipes: [teamSchema],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "organizations" },
});

const Service = mongoose.model("services", serviceSchema);
module.exports = Service;
