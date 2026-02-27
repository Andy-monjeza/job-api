const {jobs}=require('../apiSchemas/jobSchema.js')
const {applications}=require('../apiSchemas/applicationSchema.js');
const mongoose= require('mongoose')

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
 
const getMyJobs = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const myJobs = await jobs.aggregate([
           
            { 
                $match: { postedBy: new mongoose.Types.ObjectId(recruiterId) } 
            },

           
            {
                $lookup: {
                    from: 'applications',    
                    localField: '_id',       
                    foreignField: 'job',     
                    as: 'allApplications'     
                }
            },

            {
                $addFields: {
                    applicantCount: { $size: '$allApplications' }
                }
            },

            {
                $project: {
                    title: 1,
                    category: 1,
                    location: 1,
                    type: 1,
                    salary: 1,
                    appliedOn: 1, 
                    applicantCount: 1,
                    createdAt: 1
                }
            },

            { $sort: { createdAt: -1 } }
        ]);

        res.status(200).json(myJobs);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: "Error fetching your job postings." });
    }
};

module.exports = { getMyJobs };
module.exports={getAllJobs,getMyJobs};