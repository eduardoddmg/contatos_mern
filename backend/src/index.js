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
app.listen(port, () => console.log("Server listening to", port));

// routes
app.get("/", (req, res) => {
  return res.send("Welcome to API");
});

app.all("*", (req, res) => {
  return res.send("rota inválida :(");
});
