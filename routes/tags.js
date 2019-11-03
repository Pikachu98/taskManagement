var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
let mongoose = require('mongoose');
mongoose.connect(mongodbUri);

let db = mongoose.connection;
db.on('error',function (err) {
    console.log('Unable to Connect to  [' + db.name + ']',err);
});
db.once('open',function () {
    console.log('Successfully Connected to  [' + db.name + ']');
});

var Tag = require('../models/tags');
let express = require('express');
let router = express.Router();

router.editTag = function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    Tag.findById(req.params.id,function (err,tag) {
        if(err)
            res.send(err)
        else{
            tag.save(function(err){
                if(err)
                    res.send(err)
                else{
                    if(req.body.color != null)
                        tag.tagColor = req.body.color;
                    if(req.body.type != null)
                        tag.tagType = req.body.type;
                    if(req.body.description != null)
                        tag.tagDescription = req.body.description;
                    res.json({message:'Tag edited!' ,data:tag});
                }
            })
        }
    })
}

router.addTag = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    let tag = new Tag()

    tag.tagType = req.body.tagType;
    tag.tagColor = req.body.tagColor;
    tag.tagDescription = req.body.tagDescription;

    tag.save(function (err) {
        if(err)
            res.send(err)
        res.json({message:"Tag Added!", data: tag});
    })
}

router.deleteTag = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    Tag.findByIdAndRemove(req.params.id,function (err) {
        if(err)
            res.send(err)
        else
            res.json({message:"Tag Deleted!", data:Tag})
    })
}
module.exports = router;