let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        userName: String,
        userPassword: String,
        userEmail: String,
        userCoins: {type: Number, default: 0},
        tree:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'trees'
        }],
        records:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'plantingRecord'
        }]
    },
    {
        collection:'users'
    });

module.exports = mongoose.model('Users', UserSchema);
