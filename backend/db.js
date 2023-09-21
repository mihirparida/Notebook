const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/";
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('Connected to mongo successfully');
    }).catch((err)=>{
        console.log(err);
    })
} 
module.exports = connectToMongo;