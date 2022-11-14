const { getCategories } = require("./db/controllers/controllers.js");

const express = require("express");
const app = express();
app.use(express.json());


app.get("/api/categories", getCategories);

module.exports = app;
