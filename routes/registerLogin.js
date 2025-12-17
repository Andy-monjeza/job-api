const express=require('express');
const router=express.Router();
const {validateReg, validateLogin} = require('../middleware/express_valitador.js');
const {register,login}=require('../controllers/auth.js')

router.post('/register',validateReg,register);
router.post('/login',validateLogin,login)


module.exports=router;