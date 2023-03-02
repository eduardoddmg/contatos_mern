const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const initRoutes = require('./routes');

// settings
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
initRoutes(app);

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);

// server listening
app.listen(port, () => console.log("Servidor na porta: ", port));

// routes
app.get("/", (req, res) => {
  return res.send("Bem-vindo à API!");
});

app.all("*", (req, res) => {
  return res.send("rota inválida :(");
});
