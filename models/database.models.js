const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true,
        enum:['Male','Female','Others']
    },
    profilepic:{
        type:String
    }
})

const student = mongoose.model('Student',schema)

module.exports = student