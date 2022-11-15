const db = require("../connection.js");

exports.fetchCategories = () => {
  return db
    .query(
      `
        SELECT * FROM categories;
        `
    )
    .then((results) => results.rows);
};

exports.fetchReviewsById = (review_id) => {
  return db
    .query(
      `
      SELECT review_id, title, review_body, designer, review_img_url,
      reviews.votes, categories.slug AS "category", users.username AS "owner",
      reviews.created_at
      FROM reviews
      JOIN users ON users.username = reviews.owner
      JOIN categories ON categories.slug = reviews.category
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
