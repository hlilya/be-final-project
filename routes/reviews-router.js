const {
  getReviewsById,
  getReviews,
  patchVotes,
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../db/controllers/controllers.js");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id").get(getReviewsById).patch(patchVotes);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);

module.exports = reviewsRouter;
