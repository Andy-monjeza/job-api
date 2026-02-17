const {applications}=require('../apiSchemas/applicationSchema.js')

const getMyApplications=async(req,res)=>{
    const id=req.user.id;

    try{
      const myApplications = await applications.find({ applicant: id })
    .populate({
        path: 'job',
        select: 'title company location salary postedBy description category postedOn', 
        populate: {
            path: 'postedBy', 
            model: 'recruiter',
            select: 'companyName companyWebsite profilePicture' 
        }
    }).exec();

        res.status(200).json({success:true,myApplications});

    }catch(err){
        console.log(err.message);
    }
}

module.exports={getMyApplications};