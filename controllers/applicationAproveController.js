const applicationSchema=require('../apiSchemas/applicationSchema.js');

const reviewApplication=async(req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
 
    if(!id || !status) return res.status(400).json({message:"please provide proper details for the application to assess"});

    const user=req.user;
    if(user.role !== "admin" && user.role !== "recruiter") {
        return res.status(400).json({
        message:"only recruiters and admins can perform this kind of action"
    })
}
try{
    const application=await applicationSchema.findById(id);

    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status=status;
    await application.save();
    res.status(201).json({message:"user application updated successfully",application});
}

catch(err){
    console.log(err.message);
    res.status(500).json({message:"something went wrong please try again later"})
}


}

module.exports={reviewApplication};