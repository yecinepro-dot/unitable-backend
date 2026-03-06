require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var businessRouter = require("./routes/organizations");
var serviceRouter = require("./routes/services");
var emailRouter = require("./routes/emails");
var employeeRouter = require("./routes/employee");
var teamRouter = require("./routes/teams");
var planningRouter = require("./routes/planning");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/emails", emailRouter);
app.use("/users", usersRouter);
app.use("/organizations", businessRouter);
app.use("/services", serviceRouter);
app.use("/employee", employeeRouter);
app.use("/teams", teamRouter);
app.use("/planning", planningRouter);

module.exports = app;
