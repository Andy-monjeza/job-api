const bcrypt=require('bcrypt');
const {user, jobSeeker, recruiter}=require('../apiSchemas/usersSchema')

const jwt=require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { companyName, name, email, password, role } = req.body;
        
        if (!(name || companyName) || !email || !password) {
            return res.status(400).json({ success: false, message: "please provide all credentials" });
        }

        let existing;
        if (role === "jobseeker") {
            existing = await jobSeeker.findOne({ email });
        } else {
            existing = await recruiter.findOne({ email });
        }

        if (existing) return res.status(400).json({ success: false, message: "user with this email already exists" });

        const userRole = role?.trim() ? role : "jobseeker";
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (userRole === "jobseeker") {
            newUser = await jobSeeker.create({ 
                name, 
                email, 
                role: userRole, 
                password: hashedPassword 
            });
        } 
        else if (userRole === "recruiter") {
    
            newUser = await recruiter.create({ 
                name: companyName || name, 
                email, 
                role: userRole, 
                password: hashedPassword 
            });
        }

        const sessionToken = jwt.sign({
            name: newUser.name || newUser.companyName, 
            role: userRole, 
            email: newUser.email, 
            id: newUser._id,
            profilePic:newUser.profilePicture.url,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            message: "user registered successfully!",
            token: sessionToken,
            user: newUser
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: 'something went wrong please try again later' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const seeker = await jobSeeker.findOne({ email }).select('+password');
        const recruit = await recruiter.findOne({ email }).select('+password');

        const found = seeker || recruit;
        if (!found) return res.status(400).json({ message: "Invalid credentials" });

        const role = seeker ? "jobseeker" : "recruiter";

        const verified = await bcrypt.compare(password, found.password || found.passwordHash);
        if (!verified) return res.status(400).json({ message: "Invalid credentials" });

        const sessionToken = jwt.sign(
            { name: found.name, role: role, email, id: found._id,profilePic:found.profilePicture.url },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, token: sessionToken ,message:"login successful!"});
    } catch (err) {
        res.status(500).json({ message: "Error logging in" });
    }
};
module.exports={register,login};