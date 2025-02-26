const invModel = require("../models/inventory-model")
const utilities = require("../utilities/");

const detailController = {};

/* ***************************
 * Render detail view
 * ************************** */
detailController.buildDetail = async function (req, res) {
  const carId = req.params.carId;
  const data = await invModel.getCarById(carId);
  const carDetails = await utilities.buildDetailPage(data.rows[0]);
  let nav = await utilities.getNav(req.originalUrl);
  
  res.render("./detail", {
    title: "Detail Page",
    carDetails,
    nav,
  });
};

module.exports = detailController;
