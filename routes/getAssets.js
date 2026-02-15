const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken');
const {getDashBoardPage, getProfilePage,getSavedJobs,getMyApplications}=require('../controllers/getAssetsController.js')

router.get('/dashboard',getDashBoardPage);
router.get('/profile',getProfilePage);
router.get('/saved-jobs',getSavedJobs);
router.get('/my-applications',getMyApplications);

module.exports=router;