// complete and fix the dbhelpers
const db = require('./index.js');

const dbHelpers = {
  getProductsHelper: (callback) => {
    db.query(`SELECT * FROM products`, (err, results) => {
      callback(err, results);
    })
  },
  postProductsHelper: (req, callback) => {
    db.query(`INSERT INTO products (item, min_cost, curr_bid, ends_in, image) VALUES ('${req.body.item}', ${req.body.min}, ${req.body.curr}, ${req.body.ends}, '${req.body.image}')`, (err) => {
      callback(err)
    })
  },
  updateProductHelper: (req, callback) => {
    db.query(`UPDATE products SET curr_bid=${req.body.curr_bid} WHERE id=${req.params.id}`, (err) => {
      callback(err);
    })
  },
  deleteProductHelper: (req, callback) => {
    db.query(`DELETE FROM products WHERE id=${req.params.id}`, (err) => {
      callback(err);
    })
  }
}

module.exports = dbHelpers;