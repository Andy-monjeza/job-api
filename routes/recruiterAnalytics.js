const express=require('express');
const router=express.Router();
const {getRecruiterAnalytics}= require('../controllers/recruiterAnalytics.js')
const {verifyToken}=require('../middleware/veryfyToken.js')

router.get('/recruiter-analytics',verifyToken,getRecruiterAnalytics);

module.exports= router;