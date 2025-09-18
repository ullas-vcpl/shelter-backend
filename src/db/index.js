const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  
const Animal = require('../models/animal.model.js');  

const connectDB= async ()=>{
  await mongoose.connect(process.env.DBURL, {
  dbName: process.env.DBNAME
});
console.log("Connected to MongoDB: ", process.env.DBNAME);


}

module.exports=connectDB;

