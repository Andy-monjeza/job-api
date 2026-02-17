const application=require('../apiSchemas/applicationSchema.js');

const applyJob=async(req,res)=>{

    try{
    const user=req.user;
    if(user.role !== "jobseeker")return res.status(400).json({message:"only job seekers can apply to jobs"});
    const {jobId,resume,coverLetter}=req.body;
  
    const alreadyApplied=await application.findOne({applicant:user.id});
    if (alreadyApplied)return res.status(400).json({message:"you are already applied to this job"});

    const applied=await application.create({
        applicant:user.id,
        job:jobId,
        resume,
        coverLetter        
    })
    if(applied)res.status(200).json({message:"applied successfully"});

    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"something went wrong please try again later"})
    }
    
                
}

module.exports=applyJob;