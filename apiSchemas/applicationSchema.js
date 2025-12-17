const mongoose= require('mongoose');

const applicationSchema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId, ref:'job',required:true},
    applicant:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    resume:{type:String,required:true},
    coverLetter:{type:String},
     status:{
        type:String,
        enum:["hired","shortlisted","rejected","submitted"],
        default:"submitted"
    },
    appliedOn:{type:Date,default:Date.now}
   
})

module.exports = mongoose.model('application',applicationSchema);