var express = require('express');
var bodyParser = require('body-parser');
var PORT = 3000;
var data = require('./data.js')

var app = express();

/*
	### App 5 - CRUD, Queries and params
	Create CRUD endpoints on the supplied data.  You will want to use it, and mimic it's format when adding new data.
*/

app.use(bodyParser.json());

// 1) Create an endpoint to `GET` all objects.
// This - is (1) -> app.get('/api/getAllData', (req, res) => res.status(200).send(data));
// - 1b) Update endpoint #1 to look for query parameters and get only matching items.
app.get('/api/getAllData', (req, res) => {
	var results = [];
	for (var i=0; i<data.length; i++){
		for (var key in data[i]){
			if (data[i][key].toString() === req.query[key]){
				results.unshift(data[i]);
			}
		}
	}
	//console.log(req.query);
	res.status(200).send(results)
});

// 2) Create an endpoint to `POST` a new object.
app.post('/api/postItem', function(req, res, next){
	data.unshift(req.body);
	res.status(200).send(data);
});

// 3) Create an endpoint to get one item by index/id. Hint: Use `req.params`
app.get('/api/getOneItem/:id', function(req, res, next){
	// Look in 'data'(object/array), and get what ever is at index set in Postman
	res.status(200).send(data[req.params.id]);
	//console.log(req.params);
});

// 4) Create an endpoint to remove an object by index/id. Hint) Use `req.params`
app.delete('/api/nukeIt/:id', function(req, res, next){
	data.splice(req.params.id, 1);
	res.status(200).send('Sucessful removal of object\, by ID');
});

// 5) Create an endpoint that can update one object by id.
// Hint: Use `req.query` to determine which properties to update
app.put('/api/putUpdate/:id', function(req, res, next){
	for (var key in data[req.params.id]){
		if (key === Object.getOwnPropertyNames(req.query).join('')){
			data[req.params.id][key] = req.query[key];
		}
	}


	res.status(200).send(data[req.params.id]);
});


app.listen(PORT, function() {
	console.log('Listening on port',PORT);
})
