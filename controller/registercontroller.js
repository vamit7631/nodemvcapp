var Agenda = require('agenda');
var agenda = new Agenda();
var registerserviceObj = require('../model/register');


module.exports.testfunction = function (req, res) {
    var testdata = new registerserviceObj({
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
}


// async function run() {
  
//     const agenda = new Agenda();

//     agenda.define('hello', () => {
//       console.log('Hello, World!');
//       process.exit(0);
//     });
  

//     await new Promise(resolve => agenda.once('ready', resolve));
//     agenda.schedule('in 30 seconds', 'hello');
//     agenda.start();
//   }
  
//   run().catch(error => {
//     console.error(error);
//     process.exit(-1);
//   });