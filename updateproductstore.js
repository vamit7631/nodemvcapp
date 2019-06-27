https://www.codementor.io/joanvasquez/a-simple-crud-using-mysql-and-node-js-p2xvvt6q8

/************************connect.js ******************************/

const mysql = require('promise-mysql');

const dbConfig = {
        user: "root",
        password: "",
        database: "hrmsapp",
        host: "localhost",
        connectionLimit: 10
}


module.exports = async () => {
    try {
        let pool;
        let con;
        if (pool) con = pool.getConnection();
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }

}



/************************controller.js ******************************/

const registerserviceObj = require('../models/register');

module.exports.getAllDetails = async function (req, res) {
    try {
        let result = await registerserviceObj.getAllDetails(req.body)
        console.log(result,'controller')
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e,'error')
        return res.status(400).json({ 'err' : e});
    }
}



/************************model.js ******************************/

const connection = require('../config/connect')

module.exports.getAllDetails = async function () {
    let con = await connection();
    return await con.query('SELECT * FROM storeproduct')
}

