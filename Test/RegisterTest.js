const expect = require('expect');
const request = require('request');
const chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should()
chai.use(chaiHttp)

let reristrationDetails = {
    "firstname": "Sagar",
    "lastname": "Patil",
    "useremail": "sagarauction@gmail.com",
    "dob": "19400624",
    "gender": "female"
}

describe('RegistrationDetails', () => {
    describe('/Registration Test Cases', () => {
        it('CreateRegistration', (done) => {
            chai.request(server)
                .post('/registration/register/')
                .send(reristrationDetails)
                .end((err, res) => {
                    if (err) throw err
                    if (should) console.log("Registration Details api executed ...")
                    res.should.have.status(200)
                    done()
                })
        })


        it('GetRegistration Details', (done) => {
            chai.request(server)
                .get('/registration/getdetails/')
                .end((err, res) => {
                    if(err) throw err
                    if(should) console.log("Fetch Data Successfully...")
                    res.should.have.status(200)
                    done()
                })
        })
    })
});
