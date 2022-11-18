// api-router.js
const apiRouter = require("express").Router();
const userRouter = require("./users-router");
const commentsRouter = require("./comments-router.js");
const categoriesRouter = require("./categories-router");
const reviewsRouter = require("./reviews-router");

apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
