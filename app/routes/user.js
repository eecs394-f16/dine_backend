db = require('../../config/database.js');

var getMe = function(req,res){
  var userid = req.query.userid;
    var username = req.query.username;


  getUser({userid: userid, username: username},
      //on success
      function(data){
          if(data.length > 0){
              res.json(data);
          }else{
              res.status(404).send("This user was not found");
          }
      },
      // on failure
      function(error){
          res.status(500).json(error);
      }
  )
};

var getUser = function(params, successCallback, failureCallback){
    var sqlString;
    if(params.userid){
         sqlString = "SELECT * FROM users where id = "+params.userid+";";
    }else if(params.username){
         sqlString = "SELECT * FROM users where username = '"+params.username+"';";
    }else{
        failureCallback('you must pass at least a user name or userid');
    };

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

var deleteUserRequest = function(req,res){
    var username = req.query.username;
    deleteUserFunction(username,
        function(){
            res.status(200).send("user successfully deleted");
        },

        function(error){
            res.status(500).send("unable to delete user");
        }

    )
};

var deleteUserFunction = function(username, successCallback, failureCallbac){
    var sqlString = "DELETE from USERS where username = '" +
        username +
        "';";

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                failureCallback(error);
            }else{
                successCallback();
            }
        })
};



var createUser = function(req, res){
    var USER_OBJECT = req.body;
    createProfile(USER_OBJECT,
        //success
        function(object) {
            createPasswordAssociation(USER_OBJECT,
                //success on both
                function(data){
                    res.status(200).send();
                },

                //failed with password so safe to delete and try again
                function(error){
                    deleteUserFunction(USER_OBJECT.username,
                        function(){
                            res.status(500).json({msg:"unable to add user, but you can try again"})},
                        function(error){
                            res.status(500).json({msg: "Error with cleaning up, please try agian under a different user name", error: error});
                        }
                    )
                }
            )
        },
        //error
        function(error){
            if(error.code == 23505){
                res.status(409).json({msg: "Username Already Exists!", error: error})
            }else{
                res.status(500).json({msg: "Error creating user, please contact dev team and innclude the error below in your message", error: error});
            }

        }
    )


};

var createProfile = function(userObject, successCallback, failureCallback){
    var sqlString = "INSERT INTO users (first_name, last_name, username) " +
        " values(" +
        "'" + userObject.first_name + "', " +
        "'" + userObject.last_name + "', " +
        "'" + userObject.username + "'" +
        ");";


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

var createPasswordAssociation = function(userObject, successCallback, failureCallback){

    var sqlString = "INSERT INTO account (email, password, user_id) "
        + "VALUES("
        + "'"+userObject.email+"',"
        + "'"+userObject.password+"',"
        + "(select id " +
        "from users " +
        "where " +
        "username = '"+userObject.username+"'));";
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

var updateProfile = function(req, res){
    var updateObject = req.body;
    var keyName = req.body.key_name;
    var keyValue = req.body.key_value;
    var updates = req.body.updates;

    var UPDATEstring = 'UPDATE users';
    var SETstring = " SET ";
    var WHEREstring = " WHERE " + keyName+"='" + keyValue + "';";

    for(var i = 0; i < updates.length; i ++) {
        SETstring += updates[i].key + " ='" + updates[i].value + "', ";
    }

    var sqlString = UPDATEstring + SETstring.slice(0,-2) + WHEREstring;

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(keyValue + " successfully updated!");
            }
        })

};


module.exports = {
    getMe: getMe,
    getUser: getUser,
    createUser: createUser,
    deleteUser: deleteUserRequest,
    updateProfile: updateProfile
};
