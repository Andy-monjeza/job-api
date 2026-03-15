const express= require('express');
const {verifyToken}=require('../middleware/veryfyToken.js');
const router=express.Router();
const {getProfile,updateProfile,getApplicantProfile}=require('../controllers/profiles.js')

router.get('/me',verifyToken,getProfile);
router.get('/users/profiles/:profileId',getApplicantProfile);
router.put('/me/update-profile',verifyToken,updateProfile);

module.exports= router;