db = require('../../config/database.js');

var testGet = function(req,res){

  var userId = req.query.userId;
  var sqlString = "SELECT * FROM users where user_id = "+user_id";";

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
