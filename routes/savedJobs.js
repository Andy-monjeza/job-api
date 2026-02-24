const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken.js')
const {getSavedJobs,saveJob}=require('../controllers/savedJobsController.js')

router.get('/my-saved-jobs',verifyToken,getSavedJobs);
router.post('/save/:jobId',verifyToken,saveJob)

module.exports=router;