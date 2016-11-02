db = require('../../config/database.js');

var getAllCandidates = function(req,res){
  var userId = req.query.userId;

  //TODO - figure out how to get x amount at a time
  var sqlString = "SELECT * FROM users where not id = "+userId+";"

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
    getAllCandidates: getAllCandidates
};
