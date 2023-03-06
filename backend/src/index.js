const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
require('express-async-errors');

const routes = require('./routes');

const { errorHandler, notFound } = require("./middlewares");

// settings
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", routes.auth);
app.use("/api/contact", routes.contact);
app.use("/api/admin", routes.admin);

app.use(errorHandler);
app.use(notFound);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);

// server listening
app.listen(port, () => console.log("Servidor na porta: ", port));

// routes
app.get("/api", (req, res) => {
  return res.send({success: true, message: "Bem-vindo à API"});
});

app.all("*", (req, res) => {
  return res.send("rota inválida :(");
});
