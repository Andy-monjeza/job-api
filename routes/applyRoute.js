const express=require('express');
const { verifyToken } = require('../middleware/veryfyToken');
const router=express.Router();
const applyJob=require('../controllers/applyJobController.js')

router.post('/apply/:jobId',verifyToken,applyJob);

module.exports=router;   