 const{applications}=require('../apiSchemas/applicationSchema.js')
 const mongoose= require('mongoose');

const getAllRecruiterApplicants = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const allApplicants = await applications.aggregate([
           
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'job',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            { $unwind: '$jobDetails' },
            { $match: { 'jobDetails.postedBy': new mongoose.Types.ObjectId(recruiterId) } },

          
            {
                $lookup: {
                    from: 'jobseekers',
                    localField: 'applicant',
                    foreignField: '_id',
                    as: 'applicantDetails'
                }
            },
            { $unwind: '$applicantDetails' },

            
            {
                $project: {
                    _id: 1,
                    status: 1,
                    appliedOn: 1,
                    cv: 1,
                    applicantName: '$applicantDetails.name',
                    applicantLocation: '$applicantDetails.location',
                    applicantPhoto: '$applicantDetails.profilePicture.url',
                    jobTitle: '$jobDetails.title', // Replaces 'Category'
                    jobId: '$jobDetails._id'      // For the 'Sort by Job' filter
                }
            },
            { $sort: { appliedOn: -1 } }
        ]);

        res.status(200).json(allApplicants);
    } catch (err) {
        res.status(500).json({ message: "Error fetching master applicants list" });
        console.log(err.message)
    }
};

module.exports={getAllRecruiterApplicants};