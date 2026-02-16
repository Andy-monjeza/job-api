const express= require('express');
const router=express.Router();
const upload=require('../utils/multer.js');
const { uploadProfile } = require('../controllers/uploads.js')
const { verifyToken }=require('../middleware/veryfyToken.js')

router.post('/profile',verifyToken,upload.single('profilePicture'),uploadProfile);

module.exports = router;