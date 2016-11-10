db = require('../../config/database.js');
userService = require('./user.js');

var login = function(req, res) {

    var password = req.query.password;
    var email = req.query.email;
    var sqlString = "SELECT user_id FROM account where email = '" + email + "' and password = '" + password + "';";

    db.interactWithDatabase(sqlString,
        //on success
        function(data, error) {
            if (error) {
                res.status(403).send("This user - password combination was not found");
            } else {
                userService.getUser({userid: data[0].user_id},
                    //on success
                    function(data) {
                        res.json(data);
                    },
                    // on failure
                    function(error) {
                        res.json(error);
                    }
                )
            }
        })
};





module.exports = {
    login: login
};
