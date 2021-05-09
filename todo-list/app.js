const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const db = require("./db.js");

// use : Utilisation des Middlewares Express
app.use(bodyParser.json()); // Parse les requêtes avec content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse les requêtes avec content-type: application/x-www-form-urlencoded

app.use(express.static(__dirname + "/public"));

/* routes */

// Affichage de toutes les tâches lors de la connexion au site.
app.get("/", (req, res) => {
  db.then(pool =>
    pool.query('SELECT * from taches')
  ).then(results => {
    res.render('index.ejs', { todolist: results });
  });
});

// Permet de renvoyer les tâches sous JSON pour ne pas recharger la page.
app.get("/taches", (req, res) => {
  db.then(pool =>
    pool.query('SELECT * from taches')
  ).then(results => {
    res.json(results);
    console.log("Demande des tâches. \n");
  });
});

// Ajout d'une tâche dans la base de donnée.
app.post("/taches", (req, res) => {
  db.then(pool =>
    pool.query('INSERT INTO taches(libelle, status) VALUES(?,\'A_FAIRE\')', [req.body.libelle])
  ).then(() => {
    console.log("Ajout de la tâche \"" + req.body.libelle + "\" dans la base de donnée.");
    res.status(201)           // La requête s'est bien passée.
    res.location("/taches")   // Permet de recharger l'affichage.
    res.send(null);           // Il n'y a pas de corps de réponse.
  });
});

// Détails d'un tâche.
app.get("/taches/:id", (req, res) => {
  db.then(pool =>
    pool.query('SELECT * from taches WHERE id = ?', [req.params.id])
  ).then(results => {
    console.log("Demande des détails de la tâche numéro : " + req.params.id);
    res.json(results);
  });
});

// Modification d'une tâche.
// app.put("/taches/:id", (req, res) => {
// 	console.log("On souhaite modifier la tâche "+req.params.id);
// 	db.then( pool =>
// 		pool.query('SELECT * (...) WHERE id = ?', [req.params.id])
// 	).then( results => {
// 		res.json(results);
// 	});	
// });

// Modification du status d'une tâche.
app.patch("/taches/:id", (req, res) => {
  db.then(pool =>
    pool.query('UPDATE taches SET status = ? WHERE id = ?', [req.body.statut, req.params.id])
  ).then(() => {
    console.log("Modification du statut de la tâche numéro : " + req.params.id + " en '" + req.body.statut + "'");
    res.status(201)           // La requête s'est bien passée.
    res.location("/taches")   // Permet de recharger l'affichage.
    res.send(null);           // Il n'y a pas de corps de réponse.
  });
});

// Suppression d'une tâche après appuis sur la croix.
app.delete("/taches/:id", (req, res) => {
  db.then(pool =>
    pool.query('DELETE FROM taches WHERE id = ?', [req.params.id])
  ).then(() => {
    console.log("Suppression de la tâche numéro : " + req.params.id);
    res.status(202)           // La requête s'est bien passée.
    res.location("/taches")   // Permet de recharger l'affichage.
    res.send(null);           // Il n'y a pas de corps de réponse.
  });
});

// Démarrage du serveur sur le port spécifié.
app.listen(3000, () => {
  console.log("Serveur en écoute sur le port : 3000");
});