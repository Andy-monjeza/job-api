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
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
module.exports={getProfile};