// controllers/accountController.js
const accountModel = require('../models/account-model');
const utilities = require('../utilities/');

/* ****************************************
 *  Build Login View
 * *************************************** */
async function buildLogin(req, res) {
  let nav = await utilities.getNav();
  res.render("account/login", { title: "Login", nav });
}

/* ****************************************
 *  Build Register View
 * *************************************** */
async function buildRegister(req, res) {
  let nav = await utilities.getNav();
  res.render("account/register", { title: "Register", nav });
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  );

  if (regResult) {
    req.flash("notice", `Congratulations, you're registered ${account_firstname}. Please log in.`);
    res.status(201).render("account/login", { title: "Login", nav });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", { title: "Registration", nav });
  }
}

async function processLogin(req, res) { 
  let nav = await utilities.getNav();
  console.log(req.body);
  const {email, password } = req.body;
  const regResult = await accountModel.Login(
    email,
    password
  );

  if (regResult) {
    req.flash("notice", `Congratulations, you're registered ${account_firstname}. Please log in.`);
    res.status(201).render("account/login", { title: "Login", nav });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", { title: "Registration", nav });
  }
}


module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  processLogin,
};