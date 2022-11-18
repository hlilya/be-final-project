const {
  getUsers,
  getUsersByUsername,
} = require("../db/controllers/controllers.js");

const userRouter = require("express").Router();
userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getUsersByUsername);

module.exports = userRouter;
