db = require('../../config/database.js');

var testGet = function(req,res){
  var sqlString = "SELECT * FROM test;"

  db.interactWithDatabase(sqlString,
    //on success
    function(data, error){
      if(error){
        res.json(error);
      }else{
          res.json(data);
      }
    })
};


module.exports = {
    testGet: testGet
};
