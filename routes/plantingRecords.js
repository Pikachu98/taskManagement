// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
// let mongoose = require('mongoose');
// mongoose.connect(mongodbUri);
//
// let db = mongoose.connection;
// db.on('error',function (err) {
//     console.log('Unable to Connect to  [' + db.name + ']',err);
// });
// db.once('open',function () {
//     console.log('Successfully Connected to  [' + db.name + ']');
// });
var User = require('../models/users');
var Record = require('../models/plantingRecords');
let express = require('express');
let router = express.Router();

function getTotalTime(array){
    let totalTime = 0;
    array.forEach(function(obj){
        totalTime += obj.focusTime;
    })
    return totalTime;
}

router.deleteRecord = function(req,res){
    Record.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.json({message:'Records NOT Deleted!'})
        else
            res.json({message:'Records Deleted!', data: Record})
    })

}

//主要是用户id和record id有点混淆了
// router.findRecordsOfUser = function(req,res) {
//     res.setHeader('Content-Type', 'application/json');
//     Record.find({"user._Id":res.params.id},(function (err, records) {
//         if(err)
//             res.send(err)
//         else{
//             res.json({ data: records });
//         }
//     }))
// }
// router.totalFocusTime = (req,res) =>{
//
//     Record.find(function(err,records){
//         if(err)
//             res.send(err);
//         else
//             res.json({totalFocusTime: getTotalTime(records)})
//     })
// }


module.exports = router;