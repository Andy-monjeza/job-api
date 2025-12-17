const mongoose= require('mongoose');

const applicationSchema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId, ref:'job',required:true},
    applicant:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    resume:{type:String,required:true},
    coverLetter:{type:String},
    appliedOn:{type:Date,defult:Date.now}
})

module.exports = mongoose.model('application',applicationSchema);