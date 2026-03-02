const {recruiter, jobSeeker}=require('../apiSchemas/usersSchema.js');

const getUserCredentials=async(req,res)=>{
    try{
       const id=req.user.id;
    
    const body= req.body;
    console.log(req.body)
     let updated;

    if(req.user.role === "recruiter"){
        updated = await recruiter.findByIdAndUpdate(
        id, 
        body, 
        { 
            new: true,         
            runValidators: true 
        }
);
    }

    else if(req.user.id === "jobseeker"){
    updated = await jobSeeker.findByIdAndUpdate(
    id, 
    body, 
    { 
        new: true,        
        runValidators: true 
    }
);
    }

    if(!updated)return res.status(500).json({message:"unable to update credentials"});

    res.status(200).json({success:true, message:"successfully updated credentials"});
    }
   catch(err){
    console.log(err.message)
   }
}

module.exports={getUserCredentials};