//1
var http = require('http');
    express = require('express');
    path = require('path');
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    CollectionDriver = require('./collectionDriver').CollectionDriver;

//2
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mongoHost = 'localhost'; //A
var mongoPort = 27017;
var collectionDriver;

var mongoClient = new mongoClient (new Server(mongoHost, mongoPort)); //B
mongoClient.open(function(err, mongoClient){ //C
  if (!mongoClient) {
    console.error("Error! Exiting... Must start MongoDB first");
    process.exit(1); //D
  }
  var db = mongoClient.db("MyDatabase"); //E
  collectionDriver = new CollectionDriver(db);
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res){
  res.send('<html><body><h1>Hello World</h1><a href="/hello">Go to hello</a></body></html><br>')
});
app.get('/:a?/:b?/:c?', function(req,res){
    res.send(req.params.a + ' ' + req.params.b + ' ' + req.params.c);
});
app.use(function(req,res) { //1
    res.render('404', {url:req.url}) //2
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server running on port ' + app.get('port'));
});
