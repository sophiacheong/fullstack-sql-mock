// Controller here
// complete building out the controller
const dbHelpers = require('../db/dbhelpers.js');

const controller = {
  get: (req, res) => {
    dbHelpers.getProductsHelper((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },
  post: (req, res) => {
    dbHelpers.postProductsHelper(req, (err) => {
      if (err) res.status(404).send(err)
      else res.status(200).send('Success!');
    })
  },
  put: (req, res) => {
    dbHelpers.updateProductHelper(req, (err) => {
      if (err) res.status(404).send(err)
      else res.status(200).send();
    })
  },
  delete: (req, res) => {
    dbHelpers.deleteProductHelper((req, (err) => {
      if (err) res.status(404).send(err)
      else res.status(200).send();
    }))
  }
}

module.exports = controller