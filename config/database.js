// getting-started.js
const mongoose = require('mongoose');
//const url=""
//main().catch(err => console.log(err));

const connectDB=async()=> {
  await mongoose.connect('mongodb+srv://learnerid:79SJvxSAbqJGHLod@namastenode.4qrxs.mongodb.net/test_dbase');

  // use `await mongoose.connect('mongodb+srv://learnerid:79SJvxSAbqJGHLod@namastenode.4qrxs.mongodb.net/');` if your database has auth enabled
}
module.exports=connectDB;