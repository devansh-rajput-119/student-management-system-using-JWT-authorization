const jwt = require('jsonwebtoken')
const usermodel = require('../models/users.models')

const auth = async (req,res,next)=>{
    try{
        const bearerheader = req.headers['authorization']
        if(typeof bearerheader != 'undefined'){
            const bearer = bearerheader.split(' ')
            const token = bearer[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)
            console.log(user)
            req.token = user
            next()
        }else{
            res.status(401).json({message:'Token Not Provided'})
        }
    }catch(err){
        res.status(403).json({message:'Unauthorized Access'})
    }
}

module.exports = auth