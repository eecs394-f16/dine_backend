db = require('../../config/database.js');

/**
 *
 * @param req
 * @param res
 */
var unlike = function(req,res){
    var sqlString = "SELECT * FROM test;";

    res.status(200).send({result: "UNLIKED"})
};


module.exports = {
    unlike: unlike
};
