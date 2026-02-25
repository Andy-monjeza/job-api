const {jobs}=require('../apiSchemas/jobSchema')

const createJob = async (req, res) => {
    try {
        const poster = req.user; 


        if (poster.role !== "recruiter" && poster.role !== "admin") {
            return res.status(403).json({ message: "Un-authorized user" });
        }

        const {
            title,
            salary,
            location,
            type,     
            category,  
            description,
            dueDate,    
            skills,
            responsibilities,
            requirements,   
            benefits
        } = req.body;

        if (!title || !category) {
            return res.status(400).json({ message: "Title and Category are required" });
        }
console.log(poster)
      
        const newJob = await jobs.create({
            title,
            salary,
            location,
            type,
            category,
            description,
            dueDate,
            skills,
            responsibilities,
            requirements,
            benefits,
            postedBy: poster.id 
        });

        res.status(201).json({ 
            success: true, 
            message: "Job posted successfully!",
            job: newJob 
        });

    } catch (err) {
        console.error("Create Job Error:", err);
        res.status(500).json({ message: "Something went wrong, please try again later" });
    }
};

module.exports={createJob};