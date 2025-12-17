const {user,recruiter,jobSeeker}=require('../apiSchemas/usersSchema');

const getProfile=async(req,res)=>{
    const userId=req.user.id;

    try{
        let userDetails;

       if(req.user.role === "jobseeker"){
          userDetails=await jobSeeker.findById(userId).select('-password');
       }
       else if(req.user.role === "recruiter"){
          userDetails=await recruiter.findById(userId).select('-password');
       }
       res.status(200).json({success:true,profile:userDetails});

    }
    
    catch(err){
        console.log(err.message);
        res.status(500).json({succsess:false,message:"something went wrong"})
    }
}
module.exports={getProfile};