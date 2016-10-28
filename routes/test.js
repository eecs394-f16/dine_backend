
db = require('../config/database.js');

var testGet = function(req,res){
  var sqlString = "SELECT * FROM test;"

  db.interactWithDatabase(sqlString,
    function(data, error){
      res.json(data);
    },
    function(data, error){
      res.json(error);
    })
};


module.exports = {
    testGet: testGet
};
