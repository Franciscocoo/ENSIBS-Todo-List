const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const db = require("./db.js");

// use : Utilisation des Middlewares Express
app.use(bodyParser.json()); // Parse les requêtes avec content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse les requêtes avec content-type: application/x-www-form-urlencoded

// routes
app.get("/", (req, res) => {
	res.json({ message: "Bienvenue sur mon 1er service NodeJS !" });
});

app.post("/taches", (req, res) => {
	db.then( pool =>
		pool.query('INSERT INTO ...(...) VALUES(?)', [req.body])
	).then( results => {
		res.status(201);
		res.location("/taches/"+results.insertId)
		res.send(null); // Il n'y a pas de corps de réponse
	}) ;
});

app.get("/taches/:id_tache", (req, res) => {
	console.log("On demande les détails de la tâche "+req.params.id_tache);
	db.then( pool =>
		pool.query('SELECT * (...) WHERE id = :id_tache', [req.body])
	).then( results => {
		res.json(ma_tache) ; // Je retourne une réponse au format json
	});	
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
