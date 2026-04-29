const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Student = require('../models/database.models')

const uploadPath = path.join(__dirname, '../uploads')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        const newfilename = Date.now() + path.extname(file.originalname)
        cb(null,newfilename)
    }
})

const filefilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error('Only Images are Allowed'),false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter : filefilter,
    limits:{
        fileSize:1024*1024*3
    }
})

//Show all Student Data
router.get('/',async (req,res)=>{
    try{
        const search = req.query.search || ''

        const query = {
            $or:[
                {name:{$regex:search,$options:'i'}},
                {email:{$regex:search,$options:'i'}}
            ]
        }

        const students = await Student.find(query) 
        res.json(students)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//Show a single student record
router.get('/:id',async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        if(!student) return res.status(404).json({message:'Student Not Found.'})
        res.json(student)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//Add a new Student
router.post('/',upload.single('profilepic') ,async (req,res)=>{
    try{
        const student = new Student(req.body)
        if(req.file){
            student.profilepic = req.file.filename
        }
        const newstudent = await student.save()
        res.status(201).json(newstudent)
    }catch(err){
         res.status(500).json({message:err.message})
    }
})

//Update a new student
router.put('/:id',upload.single('profilepic'), async (req,res)=>{
    try{
        const existstudent = await Student.findById(req.params.id)
         if(!existstudent){
            if(req.file.filename){
                const filepath = path.join(uploadPath,req.file.filename)
            fs.unlink(filepath,(err)=>{
                if(err) console.log('Failed To Delete Image',err)
            })
            }
            return res.status(404).json({message:'Student Not Found.'})
         } 

        if(req.file){
            if(existstudent.profilepic){
                const oldimagepath = path.join(uploadPath,existstudent.profilepic)
            fs.unlink(oldimagepath,(err)=>{
                if(err) console.log('Failed To Delete Old Image',err)
            })
            }
        req.body.profilepic = req.file.filename
        }

        const updatestudent = await Student.findByIdAndUpdate(req.params.id,req.body,
            {new:true}
        )
        res.json(updatestudent)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//Delete a Student Record
router.delete('/:id',async (req,res)=>{
    try{
        const deletestudent = await Student.findByIdAndDelete(req.params.id)
        if(!deletestudent) return res.status(404).json({message:'Student Not Found.'})

        if(deletestudent.profilepic){
            const filepath = path.join(uploadPath,deletestudent.profilepic)
            fs.unlink(filepath,(err)=>{
                if(err) console.log('Failed To Delete',err)
            })
        }
        res.json({message:'Student Deleted Successfully'})
    }catch(err){
         res.status(500).json({message:err.message})
    }
})

module.exports = router