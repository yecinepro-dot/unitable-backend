const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  //Sparse autorise un attribut a etre vide même si unique
  secuNumber: { type: String, unique: true, sparse: true },
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
  },
  phone: { type: String },
  position: { type: String },
  profil: { type: String },
  isAdmin: { type: Boolean },
  birthDate: { type: Date },
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
    ref: "organizations",
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
