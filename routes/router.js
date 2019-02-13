const express = require('express')
const router = express.Router();

const userregistration = require('../controller/registercontroller')


router.post('/registration/register/', userregistration.testfunction);

router.get('/registration/getdetails/',userregistration.findregisterData);

module.exports = router;

