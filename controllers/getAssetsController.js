const path = require('path');

const getDashBoardPage = async (req, res) => {
    try {
            return res.sendFile(path.join(__dirname, '../public/dashboard.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
};

const getProfilePage=async(req,res)=>{
     try {
            return res.sendFile(path.join(__dirname, '../public/profile.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

const getSavedJobs=async(req,res)=>{
    try {
            return res.sendFile(path.join(__dirname, '../public/saved-jobs.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

const getMyApplications=async(req,res)=>{
    try {
            return res.sendFile(path.join(__dirname, '../public/my-applications.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

const getJobManager=async(req,res)=>{
    try {
            return res.sendFile(path.join(__dirname, '../public/job-manager.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

const getRecruiterDash=async(req,res)=>{
     try {
            return res.sendFile(path.join(__dirname, '../public/recruiterDash.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

const getApplicantsManager=async(req,res)=>{
       try {
            return res.sendFile(path.join(__dirname, '../public/applicantsManagerTab.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}

module.exports ={
    getDashBoardPage,
    getProfilePage,
    getSavedJobs,
    getMyApplications,
    getJobManager,
    getRecruiterDash,
    getApplicantsManager
};