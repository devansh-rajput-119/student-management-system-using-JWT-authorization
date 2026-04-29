const express = require("express")
const app = express()
const studentroutes = require('./routes/students.routes')
const path = require('path')
const connectDB = require('./config/database.config')
const userroutes = require('./routes/users.routes')
const auth = require('./middleware/auth')
const { MulterError } = require("multer")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


//Function Call of Database
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//File Upload Middleware
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

//CORS Middleware
app.use(cors())

//Login and Register Middleware
app.use('/api/users',userroutes)

//Authorization Middleware
app.use(auth)

//Routes Middleware
app.use('/api/students',studentroutes)

//Error Handling
app.use((err,req,res,next)=>{
    if(err instanceof MulterError){
        return res.status(400).send(`Image Error : ${err.message}: ${err.code}`)
    }else if(err){
        return res.status(500).send(`Something went Wrong: ${err.message}`)
    }
    next()
})

//Server Connection
app.listen(4000,()=>{
    console.log("Devansh Rajput, now you are connected to the server.")
})