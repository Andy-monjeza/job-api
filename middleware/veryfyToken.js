const jwt= require('jsonwebtoken');
require('dotenv').config();

const verifyToken=async(req,res,next)=>{
    try{
    const authHeader=req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer'))return res.status(400).json({message:"invalid token"});

    const token=authHeader.split(' ')[1];
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next(); 
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"something went wrong please try again"});
    }

}

module.exports={verifyToken};