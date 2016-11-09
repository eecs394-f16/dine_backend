db = require('../../config/database.js');

var getMe = function(req,res){
  var userId = req.params.id;
  getUser(userId,
      //on success
      function(data){
          res.json(data);
      },
      // on failure
      function(error){
          res.json(error);
      }
  )
};

var getUser = function(userId, successCallback, failureCallback){
    var sqlString = "SELECT * FROM users where id = "+userId+";";

    db.interactWithDatabase(sqlString,
      //on success
      function(data, error){
        if(error){
          failureCallback(error);
        }else{
            successCallback(data);
        }
      })
};



module.exports = {
    getMe: getMe,
    getUser: getUser
};
