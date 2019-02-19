const registermodelObj = require('../model/register');


module.exports.testfunction = async function (data){ 
    return await registermodelObj.create(data)
 }
 

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
