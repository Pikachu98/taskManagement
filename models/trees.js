let mongoose = require('mongoose');

let TreeSchema = new mongoose.Schema(
    {
        treeName: String,
        //0 for bush,1 for tree
        treeType: Number,
        treePicPath:String,
        treeDescription:String,
        coinsToBuy: {type: Number, default: 500}

    },
    {
        collection:'trees'
    });

module.exports = mongoose.model('Tree',TreeSchema);
