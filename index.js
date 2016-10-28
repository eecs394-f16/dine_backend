var express = require('express');
var pgp = require('pg-promise')();
require('dotenv').config();

var app = express();
var connection = {
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME,
  user: process.env.DB_USER,
  password:process.env.DB_PASS,
  ssl: true
}

var db = pgp(connection);


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//TEMPORARY CAN BE HUGE SECURITY FLAW
// WITH THIS APP IS OPEN TO ANYONE TO CREATE
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

var interactWithDatabase = function(queryString, callback){
  var results = [];
  console.log(queryString);
  db.any(queryString, [true])
    .then(function (data) {
        // success;
        callback(data, null)
    })
    .catch(function (error) {
        // error;
        callback(null, error)
    });
};

app.get('/test', function(req,res){
  res.json({msg:"got it"})
});

var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port" + server.address().port);
});
