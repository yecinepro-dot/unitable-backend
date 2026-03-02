const mongoose = require("mongoose");

let connectionString = process.env.CONNECTION_STRING;
connectionString =
  "mongodb+srv://yecinepro_db_user:HZ66Y25K8oJnKwCn@cluster0.ik6wdre.mongodb.net/hackatweet";
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
