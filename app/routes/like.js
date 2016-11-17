db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var like = function(req,res){
    var person_liking = req.query.person_liking;
    var person_being_liked = req.query.person_being_liked;

    if(person_liking == person_being_liked){
        res.status(409).send({msg: "YOU CANNOT LIKE YOURSELF"});
    }

    var sqlString = "INSERT INTO user_likes_candidate (user_id, likes, candidate)"
                        +" VALUES("
                        +     " ("
                        +           " SELECT id"
                        +           " FROM users"
                        +           " WHERE username = '"+person_liking+"'"
                        +       " ),"
                        + "     TRUE,"
                        +     " ("
                        +           " SELECT id"
                        +           " FROM users"
                        +           " WHERE username = '"+person_being_liked+"'"
                        + " ));";

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                if(error.code == 23502){
                    res.status(404).send("One of the users in your query is non-esistant");
                }
                res.json(error);
            }else{

                checkIfLike(person_being_liked, person_liking,
                    function() {
                        res.send("LIKED BUT UNABLE TO SEE IF IT WAS A MATCH");
                    }, function(status){
                        res.json({result: status});
                })
            }
        })
};


var unlike = function(req, res){

    var person_unliking = req.query.person_unliking;
    var person_being_unliked = req.query.person_being_unliked;

    if(person_unliking == person_being_unliked){
        res.status(409).send("users in query must be different")
    }

    var countUsersFound = 0;
    var user_id = -1;
    var candidate_id = -1;

    getUser(person_being_unliked,
        function(data){
            if(data.length ==0){
                res.status(404).send({msg: "USER - " + person_being_unliked+ " - COULD NOT BE FOUND"});
                return;
            }
            candidate_id = data[0].id;
            if(candidate_id >-1 && user_id >-1){
                deleteLikePairingFromDatabase(user_id, candidate_id, res,req)
            }
        },
        function(error){
            res.status(500).send(error);
        }
    );

    getUser(person_unliking,
        function(data){
            if(data.length ==0){
                res.status(404).send({msg: "USER - " + person_unliking+ " - COULD NOT BE FOUND"});
                return;
            }
            user_id = data[0].id;
            if(candidate_id >-1 && user_id >-1){
                deleteLikePairingFromDatabase(user_id, candidate_id, res,req)
            }
        },
        function(error){
            res.status(500).send(error);
        }
    );

};

/**
 *
 * @param user_id
 * @param candidate_id
 * @param res
 * @param req
 */
var deleteLikePairingFromDatabase = function(user_id, candidate_id, res,req){

    var sqlString = "DELETE FROM user_likes_candidate where user_id = " +user_id+ " AND candidate = " + candidate_id;

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                res.json(error);
            }else{
                res.json({result: "UNLIKED"});
            }
        })
};

var checkIfLike = function(does_user, like_user, failure, success){

    var user_1_id_miniquery =  "(SELECT id FROM users WHERE username = '"+does_user+"')";
    var user_2_id_miniquery =  "(SELECT id FROM users WHERE username = '"+like_user+"')";


    var sqlString = "SELECT * FROM user_likes_candidate where user_id = "+user_1_id_miniquery+" and candidate ="+user_2_id_miniquery ;

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                failure();
            }else{
                if(data.length == 0){
                    success("PENDING");
                }

                if(data[0].likes == false){
                    success("NO_LIKE");
                }

                success("MATCH");
            }
        })
};

/**
 *
 * @param params
 * @param successCallback
 * @param failureCallback
 */
var getUser = function(username, successCallback, failureCallback){
    var sqlString = "SELECT * FROM users where username = '"+username+"';";
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
    like: like,
    unlike: unlike
};
