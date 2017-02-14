const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var port = process.argv[2] || 8888;
app.use(bodyParser.urlencoded({extended: true}));
//The urlencoded method within body-parser tells body-parser to extract data from the <form> element 
//and add them to the body property in the request object
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://vahid:vahid@ds151049.mlab.com:51049/data-information', (err, database) => {
	if(err) return console.log(err)
	db = database;
	app.listen(port, function() {
  		console.log('listening on '+ port);
	});
});

app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray(function(err, result) {
  		if(err) return console.log(err);
  		res.render('index.ejs', {quotes: result});
	});
	//res.sendFile(__dirname + '/index.html');	
});

app.post('/quotes', (req, res) => {
  	db.collection('quotes').save(req.body, (err, result) => {
	    if (err) return console.log(err);
    	console.log('saved to database');
    	res.redirect('/');
  	});
});

app.delete('/quotes', (req, res) => {
	var id = new ObjectId(req.body.id);
	db.collection('quotes').remove({"_id": id}, (err, result) => {
    	if (err) return console.log(err);
    	console.log('saved to database');
    	res.json({"status":"ok"});
  	});
});

app.put('/quotes', function (req, res, next) {
	var id = new ObjectId(req.body.id);
	var title = req.body.title;
	var quote = req.body.quote;
	db.collection('quotes').findAndModify(
  		{_id: id}, // query
  		[['_id','asc']],  // sort order
  		{$set: {name: title, quote: quote}}, // replacement,
  		{}, // options
	  	function(err, object) {
	    	if (err){
	    		console.warn(err.message);  // returns error if no matching object found
			}else{
				res.json({"status":"ok"});
			}
  		}
  	);
});