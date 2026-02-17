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

module.exports={filterJobs};