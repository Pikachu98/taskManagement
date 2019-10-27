let mongoose = require('mongoose');

let bgmSchema = new mongoose.Schema(
    {
        bgmName: String,
        bgmPath:String,
        coinsToBuy: Number,
        coinsToBuy: {type: Number, default: 200}
    },
    {
        collection:'bgms'
    });

module.exports = mongoose.model('Bgm',bgmSchema);