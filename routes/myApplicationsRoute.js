const express= require('express');
const router=express.Router();
const {verifyToken} = require('../middleware/veryfyToken.js');
const {getMyApplications}=require('../controllers/myApplicationsController.js')

router.get('/get-my-applications',verifyToken,getMyApplications);

module.exports=router;