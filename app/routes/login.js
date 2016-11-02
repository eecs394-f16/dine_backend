db = require('../../config/database.js');

var login = function(req,res){
  var sqlString = "SELECT * FROM users where id = 2;"

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
    login: login
};
