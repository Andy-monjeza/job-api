const express= require('express');
const {verifyToken}=require('../middleware/veryfyToken.js');
const router=express.Router();
const {getProfile}=require('../controllers/profiles')

router.get('/me',verifyToken,getProfile);

module.exports= router;