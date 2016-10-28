var exports = module.exports = {};
var pgp = require('pg-promise')();
require('dotenv').config();

//database configuration

  var connection = {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    ssl: true
  }

var db = pgp(connection);

exports.interactWithDatabase = function(queryString, callback){
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
