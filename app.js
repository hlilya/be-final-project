const {
  getCategories,
  getReviews,
  postCommentByReviewId,
} = require("./db/controllers/controllers.js");
const express = require("express");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);

app.use(express.json());
app.post("/api/reviews/:review_id/comments", postCommentByReviewId);

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
