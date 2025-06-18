// require('dotenv').config(); // load .env variables

// const mongoose=require('mongoose');


// // local db 
// // const mongURL=process.env.MONGODB_URL_LOCAL;

// //mongodb atlas
// const mongURL=process.env.MONGODB_URL;

// mongoose.connect(mongURL)
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch((err) => console.error("MongoDB connection error:", err));

//  const db=mongoose.connection;


//  db.on('disconnected',()=>{
//     console.log("mongodb is disconnected")
//  })


//  db.on('error',()=>{
//     console.log("error with mongodb");
//  })

//  module.exports=db;


 // db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {

// local db 
// const mongURL=process.env.MONGODB_URL_LOCAL;

//mongodb atlas
    await mongoose.connect(process.env.MONGODB_URL); // use .env variable
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  mongoose.connection.on('disconnected', () => {
    console.log("🔌 MongoDB disconnected");
  });

  mongoose.connection.on('error', () => {
    console.log("⚠️ Error with MongoDB");
  });
};

module.exports = connectDB;

