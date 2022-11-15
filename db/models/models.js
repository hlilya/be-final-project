const db = require("../connection.js");
const { checkExists } = require("../utils.js");

exports.fetchCategories = () => {
  return db
    .query(
      `
        SELECT * FROM categories;
        `
    )
    .then((results) => results.rows);
};

exports.fetchReviews = () => {
  return db
    .query(
      `
      SELECT users.username AS "owner", title, reviews.review_id,
      reviews.category, reviews.review_img_url,
      reviews.created_at, reviews.votes, reviews.designer,
      CAST(COALESCE(COUNT(comments.review_id), 0) AS INT) AS "comment_count"
      FROM reviews
      JOIN users ON users.username = reviews.owner
      FULL OUTER JOIN comments ON comments.review_id = reviews.review_id
      GROUP BY users.username, reviews.review_id
      ORDER BY reviews.created_at DESC;
        `
    )
    .then((results) => {
      return results.rows;
    });
};

exports.insertCommentByReviewId = (review_id, newComment) => {
  const { username, body } = newComment;
  console.log(username, body);
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }
  return checkExists("reviews", "review_id", review_id)
    .then(() => {
      return checkExists("users", "username", username);
    })
    .then(() => {
      return db.query(
        `INSERT INTO comments (author, body, review_id)
      VALUES ($1, $2, $3)
      RETURNING*;`,
        [username, body, review_id]
      );
    })
    .then((res) => {
      return res.rows[0];
    });
};
