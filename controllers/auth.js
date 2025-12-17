const bcrypt=require('bcrypt');
const {user, jobSeeker, recruiter}=require('../apiSchemas/usersSchema')

const jwt=require('jsonwebtoken');
require('dotenv').config();
const register=async(req,res)=>{
    try{
        const {name,email,phone,password,role}= req.body;
        if(!name || !email || !password)return res.status(400).json({message:"please provide all credentials"});

        const existing=await user.findOne({email});

        if(existing) return res.status(400).json({message:"user with this email already exists"});

          const userRole= role?.trim() ? role : "jobseeker";
     
        const hashedPassword=await bcrypt.hash(password,10);
    
        let newUser;
        if(userRole === "jobseeker"){
         newUser=await jobSeeker.create({name, email, phone, role:userRole, password:hashedPassword})
        }
        else if(userRole ==="recruiter"){
           newUser=await recruiter.create({name, email, phone, role:userRole, password:hashedPassword})
        }
       
        const sessionToken=jwt.sign({
          name:newUser.name, 
          role, 
          email:newUser.email, 
          id:newUser._id},
          process.env.JWT_SECRET,
          {expiresIn:'1h'});

        res.status(201)
        .json({
            success:true,
            message:"user registered successfully!",
            token:sessionToken,user:newUser
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json('something went wrong please try again later');    
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
       const found=await jobSeeker.findOne({email});
       const foundRec= await recruiter.findOne({email});
       if(!found && !foundRec){
         return res.status(400).json({message:"invalid credentials"});
       } 
       
       let verified;

       if(found){verified=await bcrypt.compare(password,found.password);}
       else if(foundRec){verified=await bcrypt.compare(password,found.password);}

      if(!verified)return res.status(400).json({message:"invalid credentials"});

      const sessionToken=jwt.sign({
        email:(found || foundRec).email,
        id:(found || foundRec)._id,
        role:(found || foundRec).role,
        name:(found || foundRec).name},process.env.JWT_SECRET,
        {expiresIn:"1h"
      });
      res.status(200).json({
        success:true,
        token:sessionToken, 
        message:"login successful"
    });
    }
  catch(err){
    console.log(err);
    res.status(500).json({message:"something went wrong please try again later"})
  }
    

}

module.exports={register,login};