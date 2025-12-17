const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken.js');
const {validateApplicationStatusUpdate}=require('../middleware/express_valitador.js')
const {reviewApplication}=require('../controllers/applicationAproveController.js');


  router.put('/application/:id',verifyToken,validateApplicationStatusUpdate,reviewApplication);

module.exports=router;