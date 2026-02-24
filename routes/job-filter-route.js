const express = require('express');
const { filterJobs, getJobsFeed,getSingleJob } = require('../controllers/filtered-jobs-controller.js');
const {verifyToken}=require('../middleware/veryfyToken.js');
const router= express.Router();

router.get('/jobs',verifyToken,filterJobs);
router.get('/job-feed',getJobsFeed)
router.get('/single-job',getSingleJob);
module.exports= router;