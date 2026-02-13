const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken');
const {getDashBoardPage, getProfilePage}=require('../controllers/getAssetsController.js')

router.get('/dashboard',getDashBoardPage);
router.get('/profile',getProfilePage);

module.exports=router;