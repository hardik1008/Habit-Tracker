const mongoose=require('mongoose');
const dotenv=require('dotenv').config();

const connection=mongoose.connect(process.env.MONGO_URI);

const db=mongoose.connection;

db.on('error',function(err){
    console.log('error in connecting to db',err);
    return;
})

db.once('open',function(){
    console.log('connected to db');
})

module.exports=db;