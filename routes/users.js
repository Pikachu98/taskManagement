// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagement';
var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb?';
let mongoose = require('mongoose');
mongoose.connect(mongodbUri);

let db = mongoose.connection;
db.on('error',function (err) {
  console.log('Unable to Connect to  [' + db.name + ']',err);
});
db.once('open',function () {
  console.log('Successfully Connected to  [' + db.name + ']');
});

var User = require('../models/users');
let express = require('express');
let router = express.Router();

router.findOne = (req,res) =>{
  res.setHeader('Content-Type','application/json');
  // var keyword = req.params.id;
  // var _filter = {key:{$regex: keyword, $options: '$i'}}; // ignore capital letters
  //
  // User.find(_filter).sort({'_id':-1}).exec(function(err,user){
  //     if(err)
  //         res.json({message:'No user have found!'});
  //     else{
  //         res.json({message:'Here are searching result',user})
  //     }
  // })
  //$regex: keyword, $options: '$i'
   // const reg = new RegExp(req.params.id,'i'); // ignore capital words
   //  var searchPart = req.params.id.toString();
   //  var regularExpression = new RegExp(searchPart + ".*");
//(req.params.id).toString()
    var query = req.params.id;
    var queryString = query.toString();
    User.find({"userName":{$regex:queryString}},function(err,user) {
        if (err)
          res.json({ message: 'USER NOT Found!', errmsg : err } );
        else{
         // res.send(user[userName]);

            if(user.length == 0)
                res.json({message:'USER NOT FOUND'});
            // if(user != null)
            else
                res.json({ message: 'User has found! Do you want to send a request?',data:user} );

        }
  });
}

router.addUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = new User();
    //verify whether the userName and userEmail have existed or not
    User.findOne({userName: req.body.userName}, function (err, user) {
        if (err) {
            res.json({message: 'ERROR', errmsg: err});
        } else {
            // if(user.userName != null)
            if (user != null && user.userName == req.body.userName)
                res.json({message: 'user name already exists'})
            else {
                let user1 = new User();
                user1.userName = req.body.userName;
                user1.userEmail = req.body.userEmail;
                user1.userPassword = req.body.userPassword;
                user1.save(function (err) {
                    if (err)
                        res.json({message: 'ERROR', errmsg: err});
                    else
                        res.json({message: 'User has registered successfully', data: user1})
                })
            }
        }
    })
}

router.getCoins = (req, res)  => {
    res.setHeader('Content-Type','application/json');
    User.findById({"_id":req.params.id},{"_id":0,"userCoins":1},function(err,user) {
        if (err)
            res.json({ message: 'USER NOT Found!', errmsg : err } );
        else{
            user.save(function(err){
                if(err)
                    res.json({message:'ERROR'});
                else
                    res.json({message:'your coins: '+ user.toString()});
            })
        }
    });
}

router.deleteUser = (req,res) => {
    User.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.json({message:'User NOT DELETED!', errmsg:err})
        else
            res.json({message:'User Successfully Deleted!'});
    });
}

router.putTree = (req,res) => {
    res.setHeader('Content-Type','application/json');
    User.findById(req.params.id, function(err, user){
        if (err)
            res.json({ message: 'USER not Found!', errmsg : err } );
        else {
            user.save(function(err){
                if(err)
                    res.json({message:'Tree Not Boughted Successfully!'})
                else{
                    if(user.userCoins <= 500){
                        res.json({message:'Sorry, you do not have enough money!'})
                    }
                    else{
                        user.userCoins -= 500;
                        user.tree.push(req.body._id);
                        res.json({message:'Tree Successfully Bought!', data:user});
                    }
                }
            })
        }
    })
}



module.exports = router;
