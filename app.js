const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const routes = require('./routes/router')


app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes)

app.get('/', (req,res) => res.send('Hello World'))

app.listen(port, ()=> console.log('port is running successfully'))

module.exports = app;