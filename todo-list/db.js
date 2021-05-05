var mysql = require('promise-mysql');

var config = {
	host     : 'localhost',
	user     : 'todo_user',
	password : '123',
	database : 'todo_list'
};

// Création d'un pool de connexion, puis enregistrement de ce pool dans l'objet db
var pool = mysql.createPool(
	config
).then( pool => {
	console.log("Connexion à la base de données établie.") ;
	return pool ;
}).catch( err => {
	throw "Impossible de se connecter à la base de données : "+err;
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

module.exports = pool;
