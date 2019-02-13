const express = require('express')
const router = express.Router();

const userregistration = require('../controller/registercontroller')

/**
 * @swagger
 * definitions:
 *   TestSite:
 *     properties:
 *      firstname:
 *          type: string
 */




/**
 * @swagger
 * /registration/register:
 *   post:
 *     tags:
 *       - Register
 *     description: Creates Registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Register
 *         description: Register object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Register'
 *     responses:
 *       200:
 *         description: Successfully created
 */


router.post('/registration/register/', userregistration.testfunction);

/**
 * @swagger
 * /registration/getdetails:
 *   get:
 *     tags:
 *       - Register
 *     description: GetDetails Registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: firstname details
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of Registration Details
 * 
 */

router.get('/registration/getdetails/',userregistration.findregisterData);

module.exports = router;
