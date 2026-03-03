const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: String,
  startTime: Number,
  endTime: Number,
  dayOfWeek: [String],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "organizations" },
});

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
