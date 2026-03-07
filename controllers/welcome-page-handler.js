const { recruiter, jobSeeker } = require('../apiSchemas/usersSchema.js');

const { cloudinary } = require('../utils/cloudinary.js');

const jwt=require('jsonwebtoken');

const getUserCredentials = async (req, res) => {
    try {
        const { id, role } = req.user; 

        if (!id || !role) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const allowedUpdates = ["phoneNo", "location", "profession", "skills", "education", "socialLinks", "about", "preferredCategory", "experience"];
        const filteredBody = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) filteredBody[key] = req.body[key];
        });

       
        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "infinite_jobs_profiles" },
                        (error, result) => (result ? resolve(result) : reject(error))
                    );
                    stream.end(buffer);
                });
            };
            const result = await streamUpload(req.file.buffer);
            filteredBody.profilePicture = { url: result.secure_url, publicId: result.public_id };
        }

       
        const Model = role === "recruiter" ? recruiter : (role === "jobseeker" ? jobSeeker : null);
        
        if (!Model) {
            return res.status(403).json({ success: false, message: "Invalid role" });
        }

        const updatedUser = await Model.findByIdAndUpdate(id, filteredBody, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const sessionToken = jwt.sign({
                name: updatedUser.name, 
                role: role, 
                email: updatedUser.email, 
                id: updatedUser._id,
                profilePic: updatedUser.profilePicture?.url || "", 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
            sessionToken
        });

    } catch (err) {
        console.error("Update Error:", err.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports={getUserCredentials};