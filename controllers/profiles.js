const {admin,recruiter,jobSeeker}=require('../apiSchemas/usersSchema.js');

const getProfile = async (req, res) => {
    const { id, role,name } = req.user; 
    console.log(name,role,id)
    try {
        let userDetails;

        if (role === "jobseeker") {
            userDetails = await jobSeeker.findById(id);
        } else if (role === "recruiter") {
            userDetails = await recruiter.findById(id);
        }

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, userDetails });
        console.log(userDetails)
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    const { id, role } = req.user;
    
   
    let dataToUpdate = { ...req.body };

    try {
        const Model = role === "jobseeker" ? jobSeeker : recruiter;

        const protectedFields = ['password', 'role', 'email', '_id', 'createdAt'];
        protectedFields.forEach(field => delete dataToUpdate[field]);

        const updatedUser = await Model.findByIdAndUpdate(
            id,
            { $set: dataToUpdate }, 
            { 
                new: true,  
                runValidators: true, 
                context: 'query' 
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            userDetails: updatedUser
        });

    } catch (err) {
        console.error("Update Error:", err.message);
        
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "That email or unique field is already in use" });
        }

        res.status(500).json({ success: false, message: "Internal server error during update" });
    }
};

const getApplicantProfile = async (req, res) => {
    const { profileId } = req.params;
     console.log(profileId)
    try {
       
        const profile = await jobSeeker.findById(profileId).exec();
        console.log(profile)
       
        if (!profile) {
            return res.status(404).json({ 
                success: false, 
                message: "User profile not found" 
            });
        }

        return res.status(200).json({ success: true, profile });

    } catch (err) {
        console.error("Error fetching profile:", err.message);

        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: err.message // Optional: only for development
        });
    }
};

module.exports={getProfile,updateProfile,getApplicantProfile};