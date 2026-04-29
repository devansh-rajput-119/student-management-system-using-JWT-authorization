const express = require("express")
const mongoose = require('mongoose')


const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/student-crud')
    .then(()=>console.log("Database Connection Successful."))
    .catch(err=>console.log(err))
}

module.exports = connectDB