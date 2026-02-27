const express=require('express');
const router=express.Router();
const {getAllRecruiterApplicants}=require('../controllers/getJobApplicants.js');
const { verifyToken } = require('../middleware/veryfyToken.js');

router.get('/all-recruiter-applicants',verifyToken,getAllRecruiterApplicants);

module.exports=router;