const job=require('../apiSchemas/jobSchema')

const createJob=async(req, res)=>{

    try{
    const poster=req.user;
    console.log(poster);
    if(poster.role !== "employer" && poster.role !== "admin")return res.status(403).json({message:"un-Authorized user"});

    const {title, salary, location, company}=req.body;

    const newjob=await job.create({
        title,
        salary,
        location,
        company,
        postedBy:poster.id
    });

    res.status(201).json({success:true,message:"Job posted successfully!"})

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong please try again later"});
    }
    

}

module.exports={createJob};