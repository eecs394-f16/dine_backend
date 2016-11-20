db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var getAllMatches = function(req,res){
    var userId = req.query.userId;

    var sqlString ="SELECT u_and_ulk.*, ulk2.likes as i_like FROM"
                    + " ( SELECT u.*, ulk.likes FROM users u"
                    + " LEFT OUTER JOIN"
                    + " (SELECT * FROM user_likes_candidate ulk WHERE ulk.candidate = "+userId+" ) AS ulk"
                    + " ON u.id = ulk.user_id WHERE NOT u.id = "+userId
                    + " ) AS u_and_ulk"
                    + " LEFT OUTER JOIN"
                    + " (SELECT * from user_likes_candidate ulk  where ulk.user_id = "+userId+") as ulk2"
                    + " on u_and_ulk.id = ulk2.candidate"
                    + " where ulk2.likes and u_and_ulk.likes;";

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error){
            if(error){
                res.status(500).send(error);
            }else{
                console.log(error);
                res.status(200).send(data);
            }
        })
};


module.exports = {
    getAllMatches: getAllMatches
};
