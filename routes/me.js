const express= require('express');
const {verifyToken}=require('../middleware/veryfyToken.js');
const router=express.Router();
const {getProfile,updateProfile}=require('../controllers/profiles.js')

router.get('/me',verifyToken,getProfile);
router.put('/me/update-profile',verifyToken,updateProfile);

module.exports= router;