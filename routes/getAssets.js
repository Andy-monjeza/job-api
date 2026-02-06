const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken');
const {getDashBoard}=require('../controllers/getAssetsController.js')

router.get('/dashboard',getDashBoard);
//router.get('/profile',verifyToken,getProfile);

module.exports=router;