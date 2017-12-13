// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');  
var Book           = require('./bookmodel');        // mongoose for mong           // log requests to the console 
//var db             = require('./config/db');
// configuration ===========================================
    
// config files
//var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mango');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/',function(req,res){
	res.send('happy to be herre');
});

app.get('/books',function(req,res){
	console.log('getting aal books');
	Book.find({})
	.exec(function(err,books){
		if(err)
		{
			res.send('error');
		}
		else
			{
				console.log(books);
				res.json(books);
			}
	});
});


app.get('/books/:id',function(req,res){
	console.log('getting on book');
	Book.findOne({
		_id:req.params.id
	})
	.exec(function(err,books){
		if(err)
		{
			res.send('error occured');
		}
		else
		{
			console.log(books);
			res.json(books);
		}
	});
});


app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newBook) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
    }
  });
});


app.delete('/book/:id', function(req, res) {
  Book.findOneAndRemove({
    _id: req.params.id
  }, function(err, book) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.status(book);
    }
  });
});

    app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app; 