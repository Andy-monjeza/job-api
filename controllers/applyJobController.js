const {applications}=require('../apiSchemas/applicationSchema.js');

const applyJob=async(req,res)=>{

    const {jobId}=req.params;
    console.log(jobId)
    try{
    const user=req.user;
    if(user.role !== "jobseeker")return res.status(400).json({message:"only job seekers can apply to jobs"});
  
    const alreadyApplied=await applications.findOne({applicant:user.id, job:jobId});
    if (alreadyApplied)return res.status(400).json({message:"you are already applied to this job"});

    const applied=await applications.create({
        applicant:user.id,
        job:jobId,
        cv:user.cv        
    })
    if(applied)res.status(200).json({success:true,message:"applied successfully"});

    }
    catch(err){
        console.log(err.message);
        res.status(500).json({success:false,message:"something went wrong please try again later"})
    }
    
                
}

module.exports=applyJob;