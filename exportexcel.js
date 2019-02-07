var mongoose = require('mongoose');
var Excel = require('exceljs');
mongoose.connect('mongodb://10.26.32.136:27017/pncrfx');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});


var Schema = mongoose.Schema;

var commentSchema = new Schema({
    vendorcode: {
        type: String,
    },
    country: {
        type: String,
    },
    user_name1: {
        type: String,
    },
    user_name2: {
        type: String,
    },
    user_name3: {
        type: String,
    },
    user_name4: {
        type: String,
    },
    city: {
        type: String,

    },
    district: {
        type: String,
    },
    groupkey: {
        type: String,
    },
    vendoraccountgrp: {
        type: String,
    },
    contactPerson: mongoose.Schema.Types.Mixed,
    dispatchDetails: mongoose.Schema.Types.Mixed
},
    {
        timestamps: true,
    });

var Comment = mongoose.model('rfxvendormasters', commentSchema);

 var workbook = new Excel.Workbook();

    var worksheet = workbook.addWorksheet('My Sheet');
	
	
	    worksheet.columns = [
        { key: 'vendorcode', width: 15 },
        { key: 'vendoraccountgrp', width: 15 },
        { key: 'title', width: 15 },
        { key: 'firstname', width: 15 },
        { key: 'lastname', width: 15 },
        { key: 'vendorfullname', width: 15 },
        { key: 'city', width: 15 },
        { key: 'landlineno', width: 15 },
        { key: 'mobileno', width: 15 },
        { key: 'useremail1', width: 15 },
        { key: 'groupkey', width: 15 },
    ];

Comment.aggregate([{
		$project: {
		contactPerson: 1
	}
}], function(error, comments) {
	    for (let eachitem of comments) {
			for(let finalItem of eachitem.contactPerson){
        worksheet.addRow({
            vendorcode: finalItem.vendorcode,  vendoraccountgrp: finalItem.vendoraccountgrp, 
            title: finalItem.title, firstname: finalItem.firstname, lastname: finalItem.lastname, 
            vendorfullname: finalItem.vendorfullname, city: finalItem.city,
            landlineno: finalItem.landlineno, mobileno: finalItem.mobileno, useremail1: finalItem.useremail1,
            groupkey: finalItem.groupkey,
        });				
			}

    }
		workbook.xlsx.writeFile("TextStreamBase.xlsx");
	

   
});
