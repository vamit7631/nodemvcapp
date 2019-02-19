const registerserviceObj = require('../services/registerservice');
const registervalidateObj = require('../validation/registervalidate')

module.exports.testfunction = async function (req, res) {  
    try{
        await registervalidateObj.createValidation(req);  
        let testdata = new registerserviceObj({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            useremail : req.body.useremail,
            dob: req.body.dob,
            gender: req.body.gender
          });
          
          testdata.save(function(err) {
            if (err) {
                res.send(err)
            }
            else{
                res.send('User saved successfully!');
            }
          });
    }catch(e){
        res.send(e);
    }
}

module.exports.findregisterData = function(req,res){
    registerserviceObj.findregisterData(req, function (err, result) {
        if (err) {
            return  res.status(400).json({ 'err': err });
        } else {
            return  res.status(200).json(result);
        }
    })
}
