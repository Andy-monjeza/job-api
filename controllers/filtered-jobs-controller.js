const {jobs} = require('../apiSchemas/jobSchema.js');

const filterJobs=async(req,res)=>{
 const user= req.user;
 const filter={};
  const r=[];
  ["salary","title","company","location"].forEach(field=>{
   if(req.query[field]) r.push({[field]: {$regex:`${req.query[field]}`, $options:'i'}});
  })
  filter.$or=r;
   
  const sort={};
  if(req.query.sort){
    const [field, order]=req.query.sort.split(':');
    sort[field]=parseInt(order);
  }

  const parsedLmt = parseInt(req.query.limit) || 10; 
  const parsedPg = parseInt(req.query.page) || 1;  
  const parsedSkp = (parsedPg - 1) * parsedLmt;

  try{
    
    const filteredJobs= await jobs.find(filter)
    .sort(sort)
    .skip(parsedSkp)
    .limit(parsedLmt);

    if(filteredJobs.length === 0)return res.status(404).json({message:"did not find jobs matching your description"});

 res.status(200).json({message:"success",jobs:filteredJobs,})
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({message:"something went wrong please try again later"});
  }
 
  
}

const getJobsFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const found = await jobs.find()
      .populate('postedBy', '-password')
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .exec();

    const totalJobs = await jobs.countDocuments();

    if (!found || found.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    res.status(200).json({
      success: true,
      count: found.length,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      jobs: found
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getSingleJob=async(req,res)=>{
  try{
   const {jobId}=req.query;
   const job= await jobs.findById(jobId).populate('postedBy','-password').exec();
   if(!job)return res.status(404).json({success:false,message:"Job not found"});
   
   res.status(200).json({success:true,job});
  }catch(err){
    console.log(err.message)
  }
  
}

module.exports={filterJobs,getJobsFeed,getSingleJob};