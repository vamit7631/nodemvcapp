const registerserviceObj = require('../model/register');
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
    registerserviceObj.findregisterData(req, function(req,result){
        
    })
}
