db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var getAllCandidates = function(req,res){
    var userId = req.query.userId;

    var users_cte = "SELECT DISTINCT ON (candidates.user_id) *"
    + " FROM user_likes_candidate candidates,"
	+ " LATERAL ("
	    + " SELECT CASE WHEN EXISTS("
		+ " SELECT " + userId + ", candidate"
		  + " FROM user_likes_candidate"
		+ " WHERE user_id = candidates.user_id AND"
		+ " candidate = 8"
	    + " ) THEN true ELSE false END AS i_like"
		  + " ) t, LATERAL ( SELECT * FROM users ) info"
    + " WHERE candidates.user_id != " + userId

    var miles = 200;

    var sqlString =
	"WITH users_cte AS ( " + users_cte + " )" 
         + " SELECT users_cte.*"
         + " FROM user_location"
             + " JOIN users_cte ON  user_location.user_id = users_cte.user_id,"
             + " LATERAL ("
                + " SELECT *"
	          + " FROM user_location"
	          + " WHERE user_location.user_id = " + userId
	      + " ) coordinates,"
	      + " LATERAL ("
                  + " SELECT ST_DistanceSphere("
		      + " ST_MakePoint("
	                  + " coordinates.longitude,"
	                  + " coordinates.lattitude"
		      + " ),"
		      + " ST_MakePoint("
	                  + " user_location.longitude,"
	                  + " user_location.lattitude"
		      + " )"
                  + " ) AS distance_km"
              + " ) distance_km"
        + " WHERE distance_km <= (" + miles + "* 1609.344) AND"
            + " user_location.user_id != " + userId;

	db.interactWithDatabase(sqlString,
				//on success
	    function(data, error){
		if(error){
		    res.status(500).send(error);
		}else{
		    console.log(error)
		    res.status(200).send(data);
		}
	    })
};


module.exports = {
    getAllCandidates: getAllCandidates
};
