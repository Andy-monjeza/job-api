const {savedJobs,jobs}=require('../apiSchemas/jobSchema.js')

const getSavedJobs=async(req,res)=>{
    const userId=req.user.id;
    try{
       const mySavedJobs = await savedJobs.find({ user: userId }).populate('job').exec();
    
       res.status(200).json({success:true,savedJobs:mySavedJobs});
    }catch(err){
        console.log(err.message)
    }
}

const saveJob = async (req, res) => {
    const userId = req.user.id;
    const { jobId } = req.body;

    try {
    
        const jobExists = await jobs.findById(jobId);
        if (!jobExists) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

     
        const alreadySaved = await savedJobs.findOne({ user: userId, job: jobId }).exec();
        if (alreadySaved) {
            return res.status(400).json({ success: false, message: "Job already in your saved list" });
        }

        const newSavedJob = await savedJobs.create({
            user: userId,
            job: jobId
        });

        res.status(201).json({ 
            success: true, 
            message: "Job saved successfully!", 
            data: newSavedJob 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = {getSavedJobs,saveJob}