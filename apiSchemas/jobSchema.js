const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{type:String, required:true},
    company:{type:String,required:true},
    location:String,
    salary:Number,
    category:String,
    requirements:{type:String},
    postedBy:{type:mongoose.Schema.Types.ObjectId, ref:'recruiter', required:true},
    postedOn:{type:Date,default:Date.now}
});

const job=mongoose.model('job',jobSchema);
module.exports=job;