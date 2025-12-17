const express=require('express');
const { verifyToken } = require('../middleware/veryfyToken.js');
const{getAllJobs,getMyJobs}=require('../controllers/jobFIndRoutesController.js')
const router=express.Router();


router.get('/all',verifyToken,getAllJobs);
router.get('/my-jobs',verifyToken,getMyJobs);
module.exports=router;