// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
// let mongoose = require('mongoose');
// mongoose.connect(mongodbUri);
var Tree = require("../models/trees");

// let db = mongoose.connection;
// db.on('error',function (err) {
//     console.log('Unable to Connect to  [' + db.name + ']',err);
// });
// db.once('open',function () {
//     console.log('Successfully Connected to  [' + db.name + ']');
// });
//
// var Tree = require('../models/trees');
let express = require('express');
let router = express.Router();

router.findAllPlants = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Tree.find(function (err, trees) {
        if(err)
            res.send(err)
        res.send(JSON.stringify(trees,null,5))
    })
}

router.addTree = (req,res) => {
    res.setHeader('Content-Type', 'application/json');


    Tree.findOne({treeName: req.body.treeName}, function (err, tree) {
        if (err) {
            res.json({message: 'ERROR', errmsg: err});
        } else {
            // if(user.userName != null)
            if (tree != null && tree.treeName == req.body.treeName)
                res.json({message: 'tree has already existed'})
            else {
                if (isNaN(req.body.treeType)) {
                    res.json({message: 'tree type should be a number'});
                } else {
                    let tree = new Tree();
                    tree.treeName = req.body.treeName;
                    tree.treeType = req.body.treeType;
                    tree.treePicPath = req.body.treePicPath;
                    tree.treeDescription = req.body.treeDescription;
                    tree.save(function (err) {
                        if (err)
                            res.json({message: 'ERROR', errmsg: err});
                        else
                            res.json({message: "New tree added!", data: tree});

                    })
                }
            }
        }
    })
}

module.exports = router;