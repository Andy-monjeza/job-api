const express=require('express');
const {verifyToken}=require('../middleware/veryfyToken')
const router=express.Router();
const {createJob}=require('../controllers/jobCreate');

router.post('/post-job',verifyToken,createJob)

module.exports=router;