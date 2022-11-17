const {
  getCategories,
  getReviewsById,
  getReviews,
  postCommentByReviewId,
  getCommentsByReviewId,
  patchVotes,
  getUsers,
  getAll,
} = require("./db/controllers/controllers.js");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api", getAll);
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.post("/api/reviews/:review_id/comments", postCommentByReviewId);
app.patch("/api/reviews/:review_id", patchVotes);
app.get("/api/users", getUsers);


//handle custom errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});
//handle psql errors
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
});
//handle 500 server error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;