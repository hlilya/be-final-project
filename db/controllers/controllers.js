const {
  fetchCategories,
  fetchReviews,
  insertCommentByReviewId,
  fetchReviewsById,
  fetchCommentsByReviewId,
  updateVotes,
  fetchUsers,
  removeComment,
  fetchUsersByUsername,
  updateVotesByCommentId,
} = require("../models/models.js");

const endpoints = require("../../endpoints.json");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => res.status(200).send({ categories }))
    .catch((err) => next(err));
};

exports.getReviews = (req, res, next) => {
  const { category, sort_by, order } = req.query;
  fetchReviews(category, sort_by, order)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch((err) => next(err));
};

exports.getReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewsById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch((err) => next(err));
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const newComment = req.body;
  insertCommentByReviewId(review_id, newComment)
    .then((comment) => res.status(201).send({ comment }))
    .catch((err) => {
      next(err);
    });
};

exports.patchVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotes(review_id, inc_votes)
    .then((review) => {
      res.status(202).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => res.status(200).send({ users }))
    .catch((err) => next(err));
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  res.status(200).send({ endpoints });
  exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id)
      .then(() => {
        res.status(204).send({});
      })
      .catch((err) => next(err));
  };
};

exports.getUsersByUsername = (req, res, next) => {
  const {username} = req.params
  fetchUsersByUsername(username)
    .then((user) => res.status(200).send({user}))
    .catch((err) => next(err));
};

exports.patchCommentVotes = (req, res, next) => {
  const {comment_id} = req.params
  const {inc_votes} = req.body
  updateVotesByCommentId(comment_id, inc_votes);
}