const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdatabase');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;

const registerDetails = new Schema({
    firstname : {
        type : String,
    },
    lastname : {
        type : String,
    },
    useremail : {
        type : String,
    },
    password : {
        type : String,
    },
    dob : {
        type : Number,
    },
    gender : {
        type : String,
    }
})

const registerSchema = mongoose.model('registerdetails', registerDetails)
module.exports = registerSchema;
