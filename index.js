var express = require('express');
var pgp = require('pg-promise')();

var app = express();
var connection = {
  host:"ec2-54-235-124-2.compute-1.amazonaws.com",
  port:5432,
  database:"d5f2jhp9vvsgqh",
  user: "yaxjxskpbuqhrp",
  password:"a59tP-DWsdUu06qjF05JhGDcNg",
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
