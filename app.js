const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/index.js");

const { getAll } = require("./db/controllers/controllers.js");
const apiRouter = require("./routes/api-router.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.get("/api", getAll);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);
// error handlers

module.exports = app;