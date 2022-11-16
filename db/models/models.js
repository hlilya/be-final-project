const db = require("../connection.js");
const categories = require("../data/test-data/categories.js");
const { checkExists } = require("../utils.js");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((results) => results.rows);
};

exports.fetchReviews = (category, sort_by = "created_at", order = "DESC") => {
  const validColumns = [
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "created_at",
    "votes",
    "designer",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "invalid sort query" });
  }
  let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id,
      reviews.category, reviews.review_img_url,
      reviews.created_at, reviews.votes, reviews.designer,
      CAST(COALESCE(COUNT(comments.review_id), 0) AS INT) AS "comment_count"
      FROM reviews
      FULL OUTER JOIN comments ON comments.review_id = reviews.review_id
      `;
  if (category != undefined) {
    queryStr += `WHERE reviews.category = '${category}'`;
  }

  queryStr += ` 
 GROUP BY reviews.owner, reviews.title, reviews.review_id
 ORDER BY ${sort_by} ${order};`;
  return db.query(queryStr).then((results) => {
    const reviews = results.rows;
    if (reviews.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No reviews found",
      });
    } return reviews;
  });
};

exports.fetchReviewsById = (review_id) => {
  return db
    .query(
      `SELECT review_id, title, review_body, designer, review_img_url,
      reviews.votes, category, reviews.owner,
      reviews.created_at
      FROM reviews
      WHERE review_id = $1;`,
      [review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`,
        });
      }
      return review;
    });
};

exports.fetchCommentsByReviewId = (review_id) => {
  return checkExists("reviews", "review_id", review_id).then(() => {
    return db
      .query(
        `
      SELECT comment_id, votes, created_at, users.username AS "author",
      body, review_id
      FROM comments
      JOIN users ON users.username = comments.author
      WHERE review_id = $1
      ORDER BY created_at DESC;`,
        [review_id]
      )
      .then((results) => {
        return results.rows;
      });
  });
};

exports.insertCommentByReviewId = (review_id, newComment) => {
  const { username, body } = newComment;
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

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then((results) => results.rows);
};
