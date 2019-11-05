// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagement';
// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb?';
// let mongoose = require('mongoose');
// mongoose.connect(mongodbUri);
//
// let db = mongoose.connection;
// db.on('error',function (err) {
//   console.log('Unable to Connect to  [' + db.name + ']',err);
// });
// db.once('open',function () {
//   console.log('Successfully Connected to  [' + db.name + ']');
// });

import User from "../models/users"
let express = require("express")
let router = express.Router()

router.getUsers = (req,res) => {
  res.setHeader("Content-Type", "application/json")
  User.find(function (err, users) {
    if(err)
      res.send(err)
    res.send(JSON.stringify(users,null,5))
  })
}

router.checkOne = (req,res) => {
  res.setHeader("Content-Type", "application/json")

  User.find({ "_id" : req.params.id },function(err, donation) {
    if (err)
      res.json({ message: "USER NOT Found!", errmsg : err } )
    else
      res.send(JSON.stringify(donation,null,5))
  })
}

router.findOne = (req,res) =>{
  res.setHeader("Content-Type","application/json")

  let query = req.params.id
  let queryString = query.toString()
  User.find({"userName":{$regex:queryString}},function(err,user) {
    if (err)
      res.json({ message: "USER NOT FOUND", errmsg : err } )
    else{
      // res.send(user[userName]);

      if(user.length == 0)
        res.json({message:"USER NOT FOUND"})
      // if(user != null)
      else
        res.json({ message: "User has found! Do you want to send a request?",data:user} )

    }
  })
}

router.addUser = (req,res) => {
  res.setHeader("Content-Type", "application/json")
  let user = new User()
  //verify whether the userName and userEmail have existed or not
  User.findOne({userEmail: req.body.userEmail}, function (err, user) {
    if (err) {
      res.json({message: "ERROR", errmsg: err})
    } else {
      // if(user.userName != null)
      if (user != null && user.userEmail == req.body.userEmail)
        res.json({message: "user email already exists"})
      else {
        let user1 = new User()
        user1.userName = req.body.userName
        user1.userEmail = req.body.userEmail
        user1.userPassword = req.body.userPassword
        user1.save(function (err) {
          if (err)
            res.json({message: "ERROR", errmsg: err})
          else
            res.json({message: "User has registered successfully", data: user1})
        })
      }
    }
  })
}

router.getCoins = (req, res)  => {
  res.setHeader("Content-Type","application/json")
  User.findById({"_id":req.params.id},{"_id":0,"userCoins":1},function(err,user) {
    if (err)
      res.json({ message: "ERROR", errmsg : err } )
    else{
      user.save(function(err){
        if(err)
          res.json({message:"ERROR"})
        else
          res.json({message:"your coins: "+ user.toString()})
      })
    }
  })
}

router.deleteUser = (req,res) => {
  User.findByIdAndRemove(req.params.id, function(err){
    if(err)
      res.json({message:"User NOT DELETED!"})
    else
      res.json({message:"User Successfully Deleted!"})
  })
}

router.putTree = (req,res) => {
  res.setHeader("Content-Type","application/json")
  User.findById(req.params.id, function(err, user){
    if (err)
      res.json({ message: "ERROR", errmsg : err } )
    else {
      if(user.userCoins < 500){
        res.json({message:"Sorry, you do not have enough money!"})
      }
      else{
        let count = user.tree.length
        user.tree[count] = req.body._id
        user.markModified("tree")
        user.userCoins -= 500
        user.save(function(err){
          if(err)
            res.json({message:"Error",errmsg:err})
          // user.tree.push(req.body._id);
          res.json({message:"Tree Successfully Bought!", data:user})
        })
      }


    }
  })
}

router.deleteTree = (req,res) => {
  res.setHeader("Content-Type","application/json")
  User.findById(req.params.id, function(err, user){
    if (err)
      res.json({ message: "USER not Found!", errmsg : err } )
    else {
      for(let i = 0; i < user.tree.length; i++){
        let count = 0
        if(user.tree[i] == req.body._id){
          count = i
          user.tree.splice(i,1)
          user.markModified("tree")
          user.userCoins += 300
          user.save(function(err){
            if(err)
              res.json({message:"Tree cannot be deleted",errmsg:err})

            res.json({message:"Tree Successfully Deleted!", data:user})
          })
        }
        if(i == user.tree.length -1 && count == 0)
          res.json({message:"You have not bought this tree!",errmsg:err})
      }
    }
  })
}



module.exports = router
