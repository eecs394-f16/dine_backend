db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var getAllCandidates = function(req,res){
  var userId = req.query.userId;

  //TODO - figure out how to get x amount at a time
  var sqlString = "SELECT u.*, ulk.likes"
                + " from users u"
                + " LEFT OUTER JOIN"
                + "   ("
                + "       SELECT *"
                + "       from user_likes_candidate ulk"
                + "       where ulk.candidate = " + userId
                + "   ) as ulk"
                + " on u.id = ulk.user_id"
                +" where not u.id = "+userId
                +" and (u.photo_link NOTNULL OR u.industry NOTNULL or u.job_title NOTNULL);";
  db.interactWithDatabase(sqlString,
    //on success
    function(data, error){
      if(error){
        res.status(500).send(error);
      }else{
          res.status(200).send(data);
      }
    })
};


module.exports = {
    getAllCandidates: getAllCandidates
};
