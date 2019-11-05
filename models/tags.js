"use strict";

var mongoose = require('../routes/dbConnect');

var TagSchema = new mongoose.Schema({
  tagType: {
    type: String,
    default: "Study"
  },
  //color changed according to the emergency situation of task
  tagColor: {
    type: String,
    default: "white"
  },
  //record what the user have done during the focus period
  tagDescription: String
}, {
  collection: 'tags'
});
module.exports = mongoose.model('Tag', TagSchema);