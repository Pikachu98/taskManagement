// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
// let mongoose = require('mongoose');
// mongoose.connect(mongodbUri);
let Tree = require("../models/trees");

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
    let tree = new Tree();

    tree.treeName = req.body.treeName;
    tree.treeType = req.body.treeType;
    tree.treePicPath = req.body.treePicPath;
    tree.treeDescription = req.body.treeDescription;

    tree.save(function (err) {
        if(err)
            res.send(err)
        res.json({message:"New tree added!", data: tree});
    })
}

module.exports = router;