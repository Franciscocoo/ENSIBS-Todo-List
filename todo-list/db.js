var mysql = require('promise-mysql');

var config = {
	host     : 'localhost',
	user     : 'root',
	password : '',
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


module.exports = pool;
