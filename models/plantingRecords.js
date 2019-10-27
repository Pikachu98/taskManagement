let mongoose = require('mongoose');

let RecordSchema = new mongoose.Schema(
    {
        user:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }],
        tree:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'tree'
        }],
        tag:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'tag'
        }],
        plantedTime: Date,
        endedTime: Date,
        focusTime: {type: Number, default: 0},
        coinsEarn: {type: Number, default: 0},
    },
    {
        collection:'records'
    });

module.exports = mongoose.model('Record', RecordSchema);