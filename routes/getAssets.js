const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken');
const {getDashBoardPage, 
      getProfilePage,
      getSavedJobs,
      getMyApplications,
      getJobManager,
      getRecruiterDash,
      getApplicantsManager
    }=require('../controllers/getAssetsController.js')

router.get('/dashboard',getDashBoardPage);
router.get('/profile',getProfilePage);
router.get('/saved-jobs',getSavedJobs);
router.get('/my-applications',getMyApplications);
router.get('/job-manager',getJobManager);
router.get('/recruiter-dash',getRecruiterDash);
router.get('/applicants-manager',getApplicantsManager);
module.exports=router;