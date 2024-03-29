<<<<<<< HEAD
let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")

let indexRouter = require("./routes/index")
let usersRouter = require("./routes/users")

const users = require("./routes/users")
const trees = require("./routes/trees")
const records = require("./routes/plantingRecords")
const tags = require("./routes/tags")
let app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)


app.get("/addFriend/:id", users.findOne)        //√
app.get("/getCoinBalance/:id",users.getCoins)   //√
//administrator function
app.get("/allUsers",users.getUsers)             //√
//show all the trees in store
app.get("/plantList", trees.findAllPlants)      //√
//check one of the users details,also for administrator
app.get("/getUser/:id",users.checkOne)          //√
//show all focus time
// app.get('/totalFocusTime/:id',records.totalFocusTime);
// app.get('/plantingRecords/:id', records.findRecordsOfUser);
app.delete("/deleteUser/:id",users.deleteUser)    //√
app.delete("/deleteRecord/:id",records.deleteRecord) //√
app.delete("/deleteTag/:id",tags.deleteTag)       //√
app.put("/deleteTree/:id",users.deleteTree)
app.put("/buyTree/:id",users.putTree)               //√
app.put("/tagEdition/:id", tags.editTag)            //√
app.post("/tagCreation", tags.addTag)              //√
app.post("/user/register", users.addUser)          //√
app.post("/addTree",trees.addTree)                 //√
=======
"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var users = require("./routes/users");

var trees = require("./routes/trees");

var records = require("./routes/plantingRecords");

var tags = require("./routes/tags");

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/addFriend/:id', users.findOne); //√

app.get('/getCoinBalance/:id', users.getCoins); //√
//administrator function

app.get('/allUsers', users.getUsers); //√
//show all the trees in store

app.get('/plantList', trees.findAllPlants); //√
//check one of the users details,also for administrator

app.get('/getUser/:id', users.checkOne); //√
//show all focus time
// app.get('/totalFocusTime/:id',records.totalFocusTime);
// app.get('/plantingRecords/:id', records.findRecordsOfUser);
>>>>>>> origin/master

app.delete('/deleteUser/:id', users.deleteUser); //√

<<<<<<< HEAD
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})
=======
app.delete('/deleteRecord/:id', records.deleteRecord); //√

app.delete('/deleteTag/:id', tags.deleteTag); //√

app.put('/deleteTree/:id', users.deleteTree);
app.put('/buyTree/:id', users.putTree); //√
>>>>>>> origin/master

app.put('/tagEdition/:id', tags.editTag); //√

app.post('/tagCreation', tags.addTag); //√

app.post('/user/register', users.addUser); //√

app.post('/addTree', trees.addTree); //√
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
<<<<<<< HEAD
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
=======
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
>>>>>>> origin/master
