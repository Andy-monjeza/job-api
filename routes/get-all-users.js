const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/veryfyToken');
const app =express();
const {getAllUsers,deleteAllUsers}=require('../controllers/users')
app.use(verifyToken);

router.get('/all-users',verifyToken,getAllUsers);
router.delete('/delete-users',deleteAllUsers)

module.exports=router; 