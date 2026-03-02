const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  //Sparse autoroise un attribut a etre vide même si unique
  secuNumber: { type: String, unique: true, sparse: true },
  adress: {
    type: [String],
    default: [],
  },
  phone: { type: Number },
  position: { type: String },
  profil: { type: String },
  dateContract: { type: Date },
  typeContract: { type: String },
  hourVolumn: { type: Number },
  contact: {
    firstName: { type: String },
    lastName: { type: String },
    relation: { type: String },
    phone: { type: String },
  },
  firstConnection: { type: Boolean },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
