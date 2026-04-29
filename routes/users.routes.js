const express = require('express')
const router = express.Router()
const users = require('../models/users.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

router.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const existinguser = await users.findOne({$or:[{username},{email}]})
        if(existinguser) return res.status(400).json({message:'User Already Exist'})
        
        const hashedpassword = await bcrypt.hash(password,10)
        const user = new users({username,email,password:hashedpassword})
        const saveduser = await user.save()
        res.json(saveduser)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await users.findOne({username})
        if(!user) return res.status(400).json({message:'User Not Found'})
        
            const ismatch = await bcrypt.compare(password,user.password)
            if(!ismatch) return res.status(400).json({message:'Invalid Credentials'})

        const token = jwt.sign(
            {userid:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.json({token})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/logout',async(req,res)=>{
    res.json({message:'Logged Out Successfully.'})
})

module.exports = router




