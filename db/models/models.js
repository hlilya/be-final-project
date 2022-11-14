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
