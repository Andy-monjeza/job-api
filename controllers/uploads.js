const { cloudinary } = require('../utils/cloudinary.js'); 
const { jobSeeker, recruiter } = require('../apiSchemas/usersSchema.js'); 

const updateFullProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        let updateData = { ...req.body }; // This catches Name, Skills, Bio, etc.

        // 1. Handle Image Upload if a file exists
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
        
            updateData.profilePicture = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        // 2. Choose the correct Model based on role
        const Model = userRole === 'jobseeker' ? jobSeeker : recruiter;

        // 3. Update everything in one go
        const updatedUser = await Model.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "Server error during update" });
    }
};

module.exports = { updateFullProfile }; 