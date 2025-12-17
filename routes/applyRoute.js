const express=require('express');
const { verifyToken } = require('../middleware/veryfyToken');
const router=express.Router();

router.post('/apply',verifyToken,applyJob);

module.exports=router;  