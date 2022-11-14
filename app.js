const { getCategories } = require("./db/controllers/controllers.js");
const express = require("express");
const app = express();
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("errors/error_handling.js");

app.use(express.json());
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.get("/api/categories", getCategories);

module.exports = app;
