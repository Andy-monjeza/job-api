const express=require('express');
const router=express.Router();
const {getMarketDemandStats}=require('../controllers/matching-job-controller.js')
const {verifyToken}=require('../middleware/veryfyToken.js')

router.get('/stats/market',verifyToken,getMarketDemandStats)

module.exports=router;