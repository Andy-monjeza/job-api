const {user}=require('../apiSchemas/usersSchema');

const getProfile=async(req,res)=>{
    const userId=req.user.id;
    try{
       const userdetails=await user.findById(userId).select('-password');
       res.status(200).json({success:true,profile:userdetails});

    }
    
    catch(err){
        console.log(err.message);
        res.status(500).json({succsess:false,message:"something went wrong"})
    }
}
module.exports={getProfile};