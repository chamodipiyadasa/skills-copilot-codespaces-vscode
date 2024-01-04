//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var path = require('path');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "comments"
});

//create server
server.listen(8080);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set up the static file
app.use(express.static('public'));

//set up the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up the multer
app.use(upload.array());

//get the comments from db
app.get('/', function(req, res) {
  var sql = "SELECT * FROM comments";
  con.query(sql, function(err, result, fields) {
    res.render('index', { comments: result });
  });
});

//post the comments to db
app.post('/', function(req, res) {
  var comment = {
    name: req.body.name,
    comment: req.body.comment
  };
  var sql = "INSERT INTO comments SET ?";
  con.query(sql, comment, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect('/');
});

//socket.io
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
