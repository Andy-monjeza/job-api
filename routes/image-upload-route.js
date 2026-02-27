const express= require('express');
const router=express.Router();
const upload=require('../utils/multer.js');
const { updateFullProfile } = require('../controllers/uploads.js');
const { verifyToken }=require('../middleware/veryfyToken.js')

router.put('/profile', verifyToken, upload.single('profilePicture'), updateFullProfile);

module.exports = router;