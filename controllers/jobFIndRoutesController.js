const jobs=require('../apiSchemas/jobSchema.js')
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

  res.status(200).json({success:true,count:myJobs.length,jobs:myJobs});
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({message:"something went wrong, please try again later"});
  }
  
}
module.exports={getAllJobs,getMyJobs};