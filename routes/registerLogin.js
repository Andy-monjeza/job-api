const express=require('express');
const router=express.Router();
const {validateReg, validateLogin} = require('../middleware/express_valitador.js');
const {register,login}=require('../controllers/auth.js')
const {limitLogin}=require('../middleware/express-rate-limit.js');

router.post('/register',validateReg,register);
router.post('/login',limitLogin,validateLogin,login)


module.exports=router;