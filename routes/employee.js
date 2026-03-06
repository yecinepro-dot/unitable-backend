var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
<<<<<<< HEAD
	console.log("req.body:", req.body);
	try {
		const {
			firstName,
			lastName,
			email,
			address,
			phone,
			position,
			profil,
			birthDate,
			secuNumber,
			dateContract,
			typeContract,
			hourVolumn,
			contact,
		} = req.body;

		// On check si ces champs sont remplis
		if (!email || !firstName || !lastName) {
			return res.status(400).json({
				result: false,
				error: "Champs requis manquants",
			});
		}
=======
  // console.log("REQ.BODY:", req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      phone,
      position,
      profil,
      birthDate,
      secuNumber,
      dateContract,
      typeContract,
      hourVolumn,
      contact,
    } = req.body;

    // On check si ces champs sont remplis
    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        result: false,
        error: "Missing required fields",
      });
    }
>>>>>>> 87c299c33f17c05d0db3311683026ca0941e664e

    // Check si l'employé existe déjà
    const existingUser = await User.findOne({ email });

<<<<<<< HEAD
		if (existingUser) {
			return res.json({ result: false, error: "L'employé existe déjà" });
		}

		// On génère un mot de passe temporaire qui sera à renouveller lors de la première connexion
		const tempPassword = uid2(8);
		const hash = bcrypt.hashSync(tempPassword, 10);
=======
    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    // On génère un mot de passe temporaire
    const tempPassword = uid2(8);
    const hash = bcrypt.hashSync(tempPassword, 10);
>>>>>>> 87c299c33f17c05d0db3311683026ca0941e664e

    const newEmployee = new User({
      firstName,
      lastName,
      email,
      password: hash,
      token: uid2(32),
      address,
      phone,
      position,
      profil,
      birthDate,
      secuNumber,
      dateContract,
      typeContract,
      hourVolumn,
      contact,
      isAdmin: profil === "admin",
      firstConnection: true,
    });

    const savedEmployee = await newEmployee.save();

<<<<<<< HEAD
		res.status(201).json({
			result: true,
			message: "L'employé a été créé",
			employee: savedEmployee,
			tempPassword,
		});
	} catch (error) {
		// console.error(error);
		// res.status(500).json({
		// 	result: false,
		// 	error: "Server error",
		// });
		console.error("erreur employé:", error.message);
		res.status(500).json({ result: false, error: error.message });
	}
=======
    res.status(201).json({
      result: true,
      message: "Employee created successfully",
      employee: savedEmployee,
      tempPassword,
    });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    // 	result: false,
    // 	error: "Server error",
    // });
    console.error("ERREUR EMPLOYEE:", error.message);
    res.status(500).json({ result: false, error: error.message });
  }
>>>>>>> 87c299c33f17c05d0db3311683026ca0941e664e
});

// DELETE /employee/:id
router.delete("/:id", async (req, res) => {
  try {
    const employee = await User.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res
        .status(404)
        .json({ result: false, error: "Employé non trouvé" });
    }

    res.json({
      result: true,
      message: "Employé supprimé avec succès",
      employee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: err.message });
  }
});

module.exports = router;
