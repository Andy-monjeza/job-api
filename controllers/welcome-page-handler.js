const { recruiter, jobSeeker } = require('../apiSchemas/usersSchema.js');

const getUserCredentials = async (req, res) => {
    try {
        const id = req.user.id;
        const role = req.user.role;

        if (!id || !role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Invalid token."
            });
        }

        const allowedUpdates = [
            "phoneNo",
            "location",
            "profession",
            "skills",
            "education",
            "socialLinks",
            "about",
            "profilePicture",
            "coverPhoto",
            "portfolioUrl",
            "resumeUrl",
            "cvUrl",
            "preferredCategory",
            "experience"
        ];

        const filteredBody = {};

        Object.keys(req.body).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                filteredBody[key] = req.body[key];
            }
        });

        let updatedUser;

        if (role === "recruiter") {
            updatedUser = await recruiter.findByIdAndUpdate(
                id,
                filteredBody,
                {
                    new: true,
                    runValidators: true
                }
            );
        } 
        else if (role === "jobseeker") {
            updatedUser = await jobSeeker.findByIdAndUpdate(
                id,
                filteredBody,
                {
                    new: true,
                    runValidators: true
                }
            );
        } 
        else {
            return res.status(403).json({
                success: false,
                message: "Invalid user role."
            });
        }

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully updated credentials",
            user: updatedUser
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { getUserCredentials };