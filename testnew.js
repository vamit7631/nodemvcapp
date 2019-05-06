const quoteObject = require('../repository/RfxLineItemrQuoteRepository')
const Excel = require('exceljs');
const wb = new Excel.Workbook();
const fs = require('fs');

module.exports.addQuotes = async (req) => {
    return await quoteObject.addQuotes(req.body)

}
module.exports.getQuotes = async (req) => {
    return await quoteObject.getQuotes({ rfqNo: req.params.rfqNo, vendorNo: req.params.vendorNo });

}
module.exports.updateQuotes = async (req) => {
    let promises = [];
    let res = req.body.map(async (data) => {
        let response = await quoteObject.updateQuotes({ rfqNo: data.rfqNo, rfqLineItemNo: data.rfqLineItemNo, vendorNo: data.vendorNo }, data);
        promises.push(response);
        return promises;
    });
    return Promise.all(res).then((res) => {
        return true;
    }).catch((err) => {
        return err;
    });
}

module.exports.updateQuoteStatus = async (req) => {
    let condition = {
        "rfqNo": req.body.rfqNo,
        "vendorNo": req.body.vendorNo,
        "rfqLineItemNo": req.body.rfqLineItemNo
    }

    let promises = [quoteObject.getCollaborator({ "rfqNo": req.body.rfqNo }), quoteObject.getQuotes(condition)];
    let [collaboratorData, quoteData] = await Promise.all(promises);
    if (collaboratorData.length === 0)
        throw new Error("Collaborator not available");
    if (quoteData.length === 0)
        throw new Error("Quote not available");
    let index = quoteData[0].approveCollaborators.findIndex(eachCollaborator => eachCollaborator.collaboratorNo == req.body.collaboratorNo);
    if (index !== -1) {
        quoteData[0].approveCollaborators[index].quoteStatus = req.body.quoteStatus;
        quoteData[0].approveCollaborators[index].recomendationDate = req.body.recomendationDate;
        quoteData[0].approveCollaborators[index].recommendation = req.body.recommendation;
    } else {
        quoteData[0].approveCollaborators.push({
            "collaboratorNo": req.body.collaboratorNo,
            "collaboratorName": req.body.collaboratorName,
            "recomendationDate": req.body.recomendationDate,
            "recommendation": req.body.recommendation,
            "quoteStatus": req.body.quoteStatus
        });
    }

    await quoteObject.approvedByCollaborator(condition, quoteData[0].approveCollaborators);
    if (req.body.quoteStatus === 'Rejected' || !collaboratorData[0].isDirect) {
        await quoteObject.updateQuoteStatus(condition, req.body.quoteStatus)
        return true;
    }
    if (quoteData[0].approveCollaborators.length === collaboratorData[0].collaboratorList.length) {
        let status = true;
        for (let i = 0; i < quoteData[0].approveCollaborators.length; i++) {
            if (quoteData[0].approveCollaborators[i].status == 'Rejected') {
                status = false; break;
            }
        }
        if (status) {
            return await quoteObject.updateQuoteStatus(condition, req.body.quoteStatus)
        } else {
            return true;
        }
    }
    return true;
}




module.exports.uploadExcel = async (req) => {

    let enumData = {
        rfqNo: "rfqNo",
        technicalBidDueDate: "technicalBidDueDate",
        commercialBidDueDate: "commercialBidDueDate",
        offerReferenceNo: "offerReferenceNo",
        currency: "currency",
        offerValidityPeriod: "offerValidityPeriod",
        deliveryPeriod: "deliveryPeriod",
        paymentterms: "paymentterms",
        incoterm1: "incoterm1",
        incoterm2: "incoterm2",
        incoterm3: "incoterm3"
    }



    await req.files.sampleFile.mv('./sampleFile.xlsx');
    await wb.xlsx.readFile('sampleFile.xlsx');
    let sh = wb.getWorksheet('My Sheet');

    let rfqNo = sh.getCell('B1').value
    rfqNo = rfqNo.replace(/^\D+/g, '');




    let snodetail;
    let testarray = ['B1', 'D2', 'D4', 'D5', 'D6', 'D7', 'D8', 'G2', 'G4', 'G5', 'G6', 'G7', 'G8', 'J4', 'J5', 'J6', 'J7', 'J8'];
    let objectArray = [];
    let count = 0;
    let resultrow1
    for (let i = 1; i <= sh.rowCount; i++) {
        let billToShipTo = sh.getRow(i).getCell(1).value;
        if (billToShipTo == 'Bill To Ship To level Information') {

            let rowresult = i + 5;
            for (rowresult; rowresult <= sh.rowCount; rowresult++) {
                //   console.log(rowresult,'rowresult')
                snodetail = sh.getRow(rowresult).getCell(2).value

                if (snodetail == null) {
                    break;
                } else {
                    console.log(rowresult, 'rowresult');
                    let resultrow = sh.getRow(rowresult).values;
                    resultrow1 = sh.getRow(rowresult)._cells;

                    for (let testdata of resultrow1) {
                        if (testdata === undefined) {
                            continue;
                        } else {
                     //       console.log(testdata._address, 'address')
                            testarray.push(testdata._address)
                        }

                    }

                }


            }
            testarray.push( ('B' + i), ('D' + i), ('G' + (i + 1)), ('G' + (i + 2)), ('I' + (i + 1)), ('I' + (i + 2)))
            i += 3;
            count++;
        }
    }


     //  console.log(testarray,'testarray')


     for(let testarrayres of testarray){
         if(sh.getCell(testarrayres).value == null || sh.getCell(testarrayres).value == undefined){
   //          console.log(testarrayres,'uuuuuuuuuuuuuuuuuuuuuuu')
         }
         else{
             let arrayData = sh.getCell(testarrayres).value;      
           //  arrayData[enumData]  
           //  objectArray.push(arrayData)
            console.log(arrayData)
         }

     }




}
