const express = require("express");
const { getUserCredentials } = require("../controllers/welcome-page-handler.js");
const { verifyToken } = require("../middleware/veryfyToken.js");
const upload=require('../utils/multer.js');
const router=express.Router();

router.put('/about-user',
    verifyToken,
    upload.single('profilePicture'),
    getUserCredentials);

module.exports=router;