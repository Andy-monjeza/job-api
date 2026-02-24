const mongoose= require('mongoose');

const applicationSchema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId, ref:'job',required:true},
    applicant:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    cv:{type:String},
     status:{
        type:String,
        enum:["hired","shortlisted","rejected","submitted"],
        default:"submitted"
    },
    appliedOn:{type:Date,default:Date.now}
   
})

const applications= mongoose.model('application',applicationSchema);
module.exports = {applications};