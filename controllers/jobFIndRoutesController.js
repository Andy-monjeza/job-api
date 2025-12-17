const jobs=require('../apiSchemas/jobSchema.js')
const applicationSchema=require('../apiSchemas/applicationSchema.js');
const getAllJobs=async(req,res)=>{
    try{
      const allJobs= await jobs.find().populate('postedBy', 'name email');
      res.status(200).json({success:true,jobs:allJobs});
    }

    catch(err){
        console.log(err.message);
        res.status(500).json({message:"something went wrong, please try again later"});
    }

}

const getMyJobs=async(req,res)=>{
  try{
    const user=req.user;
    const myJobs=await jobs.find({postedBy:user.id});

    const job_and_applicants=[];
    for(let i = 0; i <= myJobs.length - 1; i++){
      const applicants =await applicationSchema.find({job:myJobs[i]._id}).populate('applicant','name email status');
          job_and_applicants.push({
            job:myJobs[i],
            no_of_applicants:applicants.length,
            jobApplicants:applicants
          })
    };
   
   res.status(200).json({success:true,count:myJobs.length,jobs:job_and_applicants});
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({message:"something went wrong, please try again later"});
  }
  
}
module.exports={getAllJobs,getMyJobs};