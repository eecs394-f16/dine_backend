//npm depdencies
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//config
require('./config/database.js')

//routes
var testRoutes = require('./routes/test.js');

if(process.env.NODE_ENV == 'test'){

}

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

//TEMPORARY CAN BE HUGE SECURITY FLAW
// WITH THIS APP IS OPEN TO ANYONE TO CREATE
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

app.route('/test')
  .get(testRoutes.testGet)



var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port" + server.address().port);
});

module.exports = app;
