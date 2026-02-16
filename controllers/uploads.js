const { cloudinary } = require('../utils/cloudinary.js'); 
const {jobSeeker} = require('../apiSchemas/usersSchema.js'); 

const uploadProfile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { 
                        folder: "infinite_jobs_profiles",
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
        
                stream.end(buffer);
            });
        };

         const result = await streamUpload(req.file.buffer);
          const updatedUser = await jobSeeker.findByIdAndUpdate(
            req.user.id, 
            { 
                profilePicture: {
                    url: result.secure_url,
                    publicId: result.public_id 
                }
            }, 
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            url: updatedUser.profilePicture
        });

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

module.exports = { uploadProfile };