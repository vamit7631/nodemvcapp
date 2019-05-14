    console.log(data, 'data')
    let resultdetail = await RfxHeaderQuotes.aggregate([{ $match: data }, { $group: { _id: null, rfqNo: { $addToSet: "$rfqNo" } } }])
    console.log(resultdetail, 'resultdetails')
    resultdetail = resultdetail.length > 0 ? resultdetail : [{ rfqNo: [] }];
    return await RfxVendorQuotes.aggregate([{
        $match: {
            "vendorList.vendorNo": data.vendorNo
        }
    }, { $lookup: { from: "rfxheaders", localField: "rfqNo", foreignField: "_id", as: "rfxHeaders" } },
    { $unwind: "$rfxHeaders" },
    { $match: { "rfxHeaders._id": { $nin: resultdetail[0].rfqNo } } },
    {
        $group: {
            _id: "$rfxHeaders.rfqStatus",
            count: { $sum: 1 }
        }
    }
    ])









db.getCollection("rfxheaderquotes").aggregate(
    [
        { 
            "$match" : {
                "vendorNo" : NumberLong(12),
               "technicalBidDueDate" : { $gte : new ISODate("2012-01-12T20:15:31Z") }
            }
        }, 
        { 
            "$group" : {
                "_id" : {
                    "rfqStatus" : "$rfqStatus"
                }, 
                "COUNT(*)" : {
                    "$sum" : NumberInt(1)
                }
            }
        }, 
        { 
            "$project" : {
                "rfqStatus" : "$_id.rfqStatus", 
                "COUNT(*)" : "$COUNT(*)", 
                "_id" : NumberInt(0)
            }
        }
    ], 
);
