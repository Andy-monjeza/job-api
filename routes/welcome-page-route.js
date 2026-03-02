const express = require("express");
const { getUserCredentials } = require("../controllers/welcome-page-handler.js");
const { verifyToken } = require("../middleware/veryfyToken.js");
const router=express.Router();

router.put('/about-user',verifyToken,getUserCredentials);

module.exports=router;