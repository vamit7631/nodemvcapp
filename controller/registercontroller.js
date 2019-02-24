const registerserviceObj = require('../services/registerservice');
const registervalidateObj = require('../validation/registervalidate')

module.exports.testfunction = async function (req, res) {
    try {
        await registervalidateObj.createValidation(req.body);
        let result = await registerserviceObj.testfunction(req.body);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        return res.status(400).json({ 'err': e });
    }
}

module.exports.getAllDetails = function (req,res){
    registerserviceObj.getAllDetails(req, function (err, result) {
        if (err) {
             res.status(400).json({ 'err': err });
        } else {
             res.status(200).json(result);
        }
    })    
}


module.exports.findregisterData = function (req, res) {
    registerserviceObj.findregisterData(req, function (err, result) {
        if (err) {
             res.status(400).json({ 'err': err });
        } else {
             res.status(200).json(result);
        }
    })
}
