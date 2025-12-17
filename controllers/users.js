const {user,recruiter,jobSeeker,admin}=require('../apiSchemas/usersSchema')

const express=require('express');
const app= express();


const getAllUsers=async(req,res)=>{
  console.log(req.user);
  
    try{
      const found=await admin.findById(req.user.id);
      if(!found)return res.status(400).json({message:"user not found"});
      if(found.role !=="admin")return res.status(403).json({message:"unauthorized user"});

     const recruiters = await recruiter.find();
     const jobseekers = await jobSeeker.find();

     const filteredRecruiters=[];
    
     recruiters.forEach(u=>{
       filteredRecruiters.push({
        name:u.name,
        email:u.email,
        role:u.role,
        id:u.id
       })
     })

     const filteredJobseekers=[];

     jobseekers.forEach(u=>{
       filteredJobseekers.push({
        name:u.name,
        email:u.email,
        role:u.role,
        id:u.id
       })
     })

    res.status(200).json({success:true,recruiters:filteredRecruiters, jobseekers:filteredJobseekers});
    
    }
  catch(err){
    res.status(500).json({message:"something went wrong please try again later"});
    console.log(err);
  }
}

const deleteAllUsers=async(req,res)=>{
    try{
        const deletedRecruiters=await recruiter.deleteMany({});
        const deletedJobSeekers=await jobSeeker.deleteMany({});
        const deletedUsers=await user.deleteMany({});

        res.status(200).json({success:true,message:"all users deleted succefully"});
    }
    catch(err){
      res.status(500).json("something went wrong please try again later");
      console.log(err.message);
    }
}

module.exports={getAllUsers,deleteAllUsers};