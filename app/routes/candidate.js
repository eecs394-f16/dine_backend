db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var getAllCandidates = function(req,res){
    var userId = req.query.userId;
    var miles = req.query.miles ? req.query.miles : 5000
    
    var sqlString = 'WITH likes AS (' +
	' SELECT u.candidate AS id, true AS i_like ' +
	' FROM user_likes_candidate u' +
	' WHERE u.user_id = ' + userId +
    ' ),' +
	' not_liked AS (' +
	    ' SELECT users.id AS id, false AS i_like' +
	    ' FROM users' +
	    ' WHERE users.id' +
            ' NOT IN (' +
		' SELECT id FROM likes' +
            ' )' +
            ' AND users.id != ' + userId +
	' ),' +
	' likes_excluding_matches AS (' +
	    ' SELECT * FROM likes' +
	    ' EXCEPT' +
	    ' SELECT u.user_id AS id, true AS i_like' +
	    ' FROM user_likes_candidate u' +
	    ' WHERE u.candidate = ' + userId +
	' ),' +
	' candidates AS (' +
	    ' SELECT * FROM likes_excluding_matches' +
	    ' UNION' +
	    ' SELECT * FROM not_liked' +
	' ),' +
	' nearby_candidates AS (' +
	    ' SELECT *' +
	    ' FROM user_location' +
            ' JOIN candidates ON' +
            ' user_location.user_id = candidates.id' +
	    ' ,' +
            ' LATERAL (' +
		' SELECT *' +
     		' FROM user_location' +
		' WHERE user_location.user_id = ' + userId +
            ' ) coordinates,' +
            ' LATERAL (' +
		' SELECT ST_DistanceSphere(' +
                    ' ST_MakePoint(' +
			' coordinates.longitude,' +
			' coordinates.lattitude' +
	            ' ),' +
	            ' ST_MakePoint(' +
			' user_location.longitude,' +
			' user_location.lattitude' +
                    ' )' +
		' ) AS distance_km' +
            ' ) distance_km' +
	    ' WHERE distance_km <= (' + miles + ' * 1609.344) AND' +
            ' user_location.user_id != ' + userId +
	' )' +
    ' SELECT users.*, nearby_candidates.i_like' +
    ' FROM nearby_candidates' +
    ' JOIN users ON' +
    ' users.id = nearby_candidates.id';

   /* var sqlString ="SELECT DISTINCT u_and_ulk.*, ulk2.likes as i_like FROM"
					+" ( SELECT u.*, ulk.likes FROM users u"
					+" LEFT OUTER JOIN"
					+" (SELECT * FROM user_likes_candidate ulk WHERE ulk.candidate = "+userId+" ) AS ulk"
					+" ON u.id = ulk.user_id WHERE NOT u.id = "+userId+" AND (u.photo_link NOTNULL OR u.industry NOTNULL or u.job_title NOTNULL)"
					+" ) AS u_and_ulk"
					+" LEFT OUTER JOIN"
					+" (SELECT * from user_likes_candidate ulk  where ulk.user_id = "+userId+") as ulk2"
					+" on u_and_ulk.id = ulk2.candidate"
					+" where ulk2.likes is null or u_and_ulk.likes is null ;";*/



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
