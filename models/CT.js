const mongoose = require("mongoose");

// CT = Créneau Travail
const CTSchema = mongoose.Schema({
  date: Date,
  startTime: Number, // minutes depuis minuit
  endTime: Number, // minutes depuis minuit
  pause: Number, // en minutes
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  role: [{ type: String }],
  checkArrival: Number,
  checkDeparture: Number,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "organizations" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // admin
});

const CT = mongoose.model("creneaux", CTSchema);
module.exports = CT;
