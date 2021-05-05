const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// use : Utilisation des Middlewares Express
app.use(bodyParser.json()); // Parse les requêtes avec content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse les requêtes avec content-type: application/x-www-form-urlencoded

// routes
app.get("/", (req, res) => {
	res.json({ message: "Bienvenue sur mon 1er service NodeJS !" });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
