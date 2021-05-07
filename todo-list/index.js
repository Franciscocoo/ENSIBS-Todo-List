const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const db = require("./db.js");

// use : Utilisation des Middlewares Express
app.use(bodyParser.json()); // Parse les requêtes avec content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse les requêtes avec content-type: application/x-www-form-urlencoded


/* routes */

app.post("/taches", (req, res) => {
	db.then( pool =>
		pool.query('INSERT INTO taches(libelle, status) VALUES(?,\'A faire\')', [req.body.libelle])
	).then( results => {
		res.status(201)
		res.location("/taches/"+results.insertId)
		res.send(null); // Il n'y a pas de corps de réponse
	}) ;
});

app.get("/", (req, res) => {
	db.then( pool =>
		pool.query('SELECT * from taches')
	).then( results => {
		res.render('index.ejs', {todolist: results});
	}) ;
});

app.get("/taches", (req, res) => {
	db.then( pool =>
		pool.query('SELECT * from taches')
	).then( results => {
		res.json(results);
	});	
});

app.get("/taches/:id", (req, res) => {
	console.log("On demande les détails de la tâche "+ req.params.id);
	db.then( pool =>
		pool.query('SELECT * from taches WHERE id = ?', [req.params.id])
	).then( results => {
		res.json(resultat);
	});	
});

//TODO
app.put("/taches/:id_tache", (req, res) => {
	console.log("On souhaite modifier la tâche "+req.params.id_tache);
	db.then( pool =>
		pool.query('SELECT * (...) WHERE id = ?', [req.body])
	).then( results => {
		res.json(resultat);
	});	
});

app.patch("/taches/:id", (req, res) => {
	db.then( pool =>
		pool.query('UPDATE taches SET status = \'FAIT\' WHERE id = ?', [req.params.id])
	).then( results => {
		res.json(results); 
	});	
});

app.delete("/taches", (req, res) => {
	console.log("On souhaite supprimer la table ");
	db.then( pool =>
		pool.query('DELETE FROM taches WHERE id = ?', [req.body.id])
	).then( results => {
		console.log("Suppresion effectuée !");
	});	
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
