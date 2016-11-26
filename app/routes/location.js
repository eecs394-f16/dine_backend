db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */

var updateLocation = function(req,res){

    var userId = req.body.userId;
    var lat = req.body.lat;
    var lon = req.body.lon;

    var sqlString = "UPDATE  user_location"	
    + " SET lattitude = " + lat + ","
    +    " longitude = " + lon + ","
       + " last_time_here = now()"
    + " WHERE user_id = " + userId + ";"
    + " INSERT INTO user_location (user_id, lattitude, longitude, last_time_here)"
    + " SELECT " + userId + ", " + lat + ", " + lon + ", " + "now()"
    + " WHERE NOT EXISTS ("
      + " SELECT 1"
	+ " FROM user_location"
	+ " WHERE user_id = " + userId 
    + " );";

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
    updateLocation: updateLocation
};
