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
                    if(req.body.tagColor != null)
                        tag.tagColor = req.body.tagColor;
                    if(req.body.tagType != null)
                        tag.tagType = req.body.tagType;
                    if(req.body.tagDescription != null)
                        tag.tagDescription = req.body.tagDescription;
                    tag.save(function (err,tag) {
                        if(err)
                            res.json({message:'Tag edited fail!', errmsg:err})
                        res.json({message:'Tag edited!' ,data:tag});
                    })

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
            res.json({message:"Tag NOT Deleted!", data:Tag})
        else
            res.json({message:"Tag Deleted!", data:Tag})
    })
}
module.exports = router;