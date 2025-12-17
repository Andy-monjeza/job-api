const application=require('../apiSchemas/applicationSchema.js');

const applyJob=async(req,res)=>{

    const user=req.user;
    if(user.role !== "jobseeker")return res.status(400).json({message:"only job seekers can apply to jobs"});
    const {resume,coverLetter}=req.body;
  
    
            
    
}
