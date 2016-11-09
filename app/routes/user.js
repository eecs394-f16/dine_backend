db = require('../../config/database.js');

var getMe = function(req,res){

  var userId = req.params.id;
  var sqlString = "SELECT * FROM users where id = "+userId+";";

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
    getMe: getMe
};
