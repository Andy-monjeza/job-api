const express = require('express');
const { filterJobs } = require('../controllers/job-filter-controller.js');
const {verifyToken}=require('../middleware/veryfyToken.js');
const router= express.Router();

router.get('/jobs',verifyToken,filterJobs);

module.exports= router;