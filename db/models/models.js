const db = require("../connection.js");
const { checkExists } = require("../seeds/utils.js");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((results) => results.rows);
};
exports.fetchReviews = () => {
  return db
    .query(
      `SELECT users.username AS "owner", title, reviews.review_id,
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
      console.log(results);
      return results.rows;
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
