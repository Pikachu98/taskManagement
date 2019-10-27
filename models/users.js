let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        userName: String,
        userPassword: String,
        userEmail: String,
        userCoins: {type: Number, default: 0},
        tree:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'tree'
        }],
        bgm:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'bgm'
        }]
    },
    {
        collection:'users'
    });

module.exports = mongoose.model('User', UserSchema);