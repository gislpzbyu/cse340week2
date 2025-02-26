/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config(); // Load environment variables
const app = express();
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Inventory route

/* ***********************
 * Middleware
 *************************/
app.use(express.json()); // To handle JSON payloads
app.use(express.urlencoded({ extended: true })); // To handle form submissions

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Not at views root

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes);
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute); // Inventory routes

/* ***********************
 * Server Configuration
 *************************/
const port = process.env.PORT || 5500; // Default to 5500 if not defined
const host = "0.0.0.0"; // Listen on all interfaces (important for Render)

/* ***********************
 * Start the Server
 *************************/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});