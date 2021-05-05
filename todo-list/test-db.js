const db = require("./db.js");

db.then( pool => 
	pool.query('SELECT * from taches')
).then( results => {
	console.log(results);
}) ;
