const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (currentUrl) {
 
  let data = await invModel.getClassifications();
  let nav = '<nav class="navbar">';
  nav += '<ul class="nav-links">';

  let homeClass = currentUrl === "/" ? 'class="active"' : "";
  nav += `<li><a href="/" ${homeClass} title="Home page">Home</a></li>`;

  data.rows.forEach((row) => {
    let link = `/inv/type/${row.classification_id}`;
    let isActive = currentUrl?.startsWith(link) ? 'class="active"' : ""; 

    nav += `<li><a href="${link}" ${isActive} title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
  });

  nav += "</ul></nav>";

  return nav;
};



module.exports = Util;


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<div class="grid-container">';
    data.forEach(function (vehicle) {
      grid += '<div class="grid-item">';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" class="vehicle-img"/></a>';
      grid += '<div class="vehicle-info">';
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span class='price'>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</div>";
    });
    grid += "</div>";
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};
