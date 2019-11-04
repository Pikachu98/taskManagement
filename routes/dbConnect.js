var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
let mongoose = require('mongoose');
mongoose.connect(mongodbUri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error',function (err) {
    console.log('Unable to Connect to  [' + db.name + ']',err);
});
db.once('open',function () {
    console.log('Successfully Connected to  [' + db.name + ']');
});

module.exports = mongoose;