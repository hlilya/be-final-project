const { deleteComment } = require("../db/controllers/controllers.js");

const commentsRouter = require("express").Router();

commentsRouter.route("/:comment_id").delete(deleteComment);

module.exports = commentsRouter;
