// DEPENDENCIES

const express = require("express");
const path = require("path");

// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server

const app = express();

// Sets an initial port, for later use in listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.static("app/public"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server to begin listening

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});