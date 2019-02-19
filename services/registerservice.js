const registermodelObj = require('../model/register');

module.exports.findregisterData = function(req,cb){
    let condition = { firstname : req.query.firstname};
    registermodelObj.find(condition, function(err, result){
        if (err) {
            return cb({ 'error': err }, null);
        } else {
            return cb(null, result);
        }
           
    })
}
