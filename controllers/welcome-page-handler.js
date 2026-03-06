const { recruiter, jobSeeker } = require('../apiSchemas/usersSchema.js');
const { cloudinary } = require('../utils/cloudinary.js'); 
const jwt=require('jsonwebtoken');

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

         if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "infinite_jobs_profiles" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer); 
                });
            };

            const result = await streamUpload(req.file.buffer);
        
            filteredBody.profilePicture = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

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

            const sessionToken = jwt.sign({
                   name: req.user.name || newUser.companyName, 
                   role: req.user.role, 
                   email: req.user.email, 
                   id: req.user._id,
                   profilePic:newUser.profilePicture.url,
               },
               process.env.JWT_SECRET,
               { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: "Successfully updated credentials",
            user: updatedUser,
            sessionToken
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