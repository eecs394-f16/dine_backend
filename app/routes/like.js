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
                    res.status(404).send("One of the users in your query is non-existant");
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

    var person_unliking_query =  "(SELECT id FROM users WHERE username = '"+person_unliking+"')";
    var person_being_unliked_query =  "(SELECT id FROM users WHERE username = '"+person_being_unliked+"')";

    var sqlString = "DELETE FROM user_likes_candidate where user_id = " +person_unliking_query+ " AND candidate = " + person_being_unliked_query;

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                res.send(500).send(error);
            }else{
                res.send({msg: "UNLIKED"});
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
