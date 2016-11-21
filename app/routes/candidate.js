db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var getAllCandidates = function(req,res){
    var userId = req.query.userId;

    // var users_cte = "SELECT DISTINCT ON (candidates.user_id) *, candidates.user_id as id"
    // + " FROM user_likes_candidate candidates,"
	// + " LATERAL ("
	//     + " SELECT CASE WHEN EXISTS("
	// 	+ " SELECT " + userId + ", candidate"
	// 	  + " FROM user_likes_candidate"
	// 	+ " WHERE user_id = candidates.user_id AND"
	// 	+ " candidate = " + userId
	//     + " ) THEN true ELSE false END AS i_like"
	// 	  + " ) t, LATERAL ( SELECT * FROM users ) info"
    // + " WHERE candidates.user_id != " + userId;
    //
    // var miles = 200;
    //
    // var sqlString =
	// "WITH users_cte AS ( " + users_cte + " )"
     //     + " SELECT users_cte.*"
     //     + " FROM user_location"
     //         + " JOIN users_cte ON  user_location.user_id = users_cte.user_id,"
     //         + " LATERAL ("
     //            + " SELECT *"
	//           + " FROM user_location"
	//           + " WHERE user_location.user_id = " + userId
	//       + " ) coordinates,"
	//       + " LATERAL ("
     //              + " SELECT ST_DistanceSphere("
	// 	      + " ST_MakePoint("
	//                   + " coordinates.longitude,"
	//                   + " coordinates.lattitude"
	// 	      + " ),"
	// 	      + " ST_MakePoint("
	//                   + " user_location.longitude,"
	//                   + " user_location.lattitude"
	// 	      + " )"
     //              + " ) AS distance_km"
     //          + " ) distance_km"
     //    + " WHERE distance_km <= (" + miles + "* 1609.344) AND"
     //        + " user_location.user_id != " + userId;

    var sqlString ="SELECT DISTINCT u_and_ulk.*, ulk2.likes as i_like FROM"
					+" ( SELECT u.*, ulk.likes FROM users u"
					+" LEFT OUTER JOIN"
					+" (SELECT * FROM user_likes_candidate ulk WHERE ulk.candidate = "+userId+" ) AS ulk"
					+" ON u.id = ulk.user_id WHERE NOT u.id = "+userId+" AND (u.photo_link NOTNULL OR u.industry NOTNULL or u.job_title NOTNULL)"
					+" ) AS u_and_ulk"
					+" LEFT OUTER JOIN"
					+" (SELECT * from user_likes_candidate ulk  where ulk.user_id = "+userId+") as ulk2"
					+" on u_and_ulk.id = ulk2.candidate"
					+" where ulk2.likes is null or u_and_ulk.likes is null ;";



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
    getAllCandidates: getAllCandidates
};
