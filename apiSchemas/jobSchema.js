const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{type:String, required:true},
    company:{type:String,required:true},
    location:String,
    salary:Number,
    category:String,
    description:{type:String},
    requirements:{type:String},
    postedBy:{type:mongoose.Schema.Types.ObjectId, ref:'recruiter', required:true},
    postedOn:{type:Date,default:Date.now}
});

const savedJobsSchema=new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId, ref:'job',required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'jobseeker',required:true},
    savedAt:{type:Date,default:Date.now}
})

const jobs=mongoose.model('job',jobSchema);
const savedJobs=mongoose.model('saved-job',savedJobsSchema);
module.exports={jobs,savedJobs};