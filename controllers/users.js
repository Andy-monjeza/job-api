const {user}=require('../apiSchemas/usersSchema')

const express=require('express');
const app= express();


const getAllUsers=async(req,res)=>{
  console.log(req.user);
  
    try{
      const found=await user.findById(req.user.id);
      if(!found)return res.status(400).json({message:"user not found"});
      if(found.role !=="admin")return res.status(403).json({message:"unauthorized user"});

     const users = await user.find();
     const filtered=[];
     users.forEach(u=>{
       filtered.push({
        name:u.name,
        email:u.email,
        role:u.role
       })
     })

    res.status(200).json({success:true,user:filtered})
    
    }
  catch(err){
    res.status(500).json({message:"something went wrong please try again later"});
    console.log(err);
  }
}

const deleteAllUsers=async(req,res)=>{
    try{
        const deleted=await user.deleteMany({});
        res.status(200).json({success:true,message:"all users deleted succefully"});
    }
    catch(err){
      res.status(500).json({message:err.message})
    }
}

module.exports={getAllUsers,deleteAllUsers};