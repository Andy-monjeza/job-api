const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  role: {
    type: String,
    enum: ['jobseeker', 'recruiter','admin'],
    default: 'jobseeker'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true ,select:false},
  role: { type: String, default: "admin" },
  phone: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true ,select:false},
  role:{type:String,enum:['jobseeker'],default:"jobseeker"},
  phoneNo:Number,
  skills:{
    type:[String],
    defult:[]
  },
  experience:{type:String},
  location: String,
  profilePicture: {
    url: {
        type: String
    },
    publicId: {
        type: String,
        default: null
    }
},
  coverPhoto:{url:String, publicId:String},
  Profession:String,
  preferedCategory:String,
  about:String,

  socialLinks:[{
    instagram:String,
    facebook:String,
    github:String,
    linkedin:String,
    website:String,
    x:String,
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date
  }],
  resumeUrl: String,
  CVurl:String,
  portfolioUrl: String,

  createdAt: { type: Date, default: Date.now }
});

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:{type:String,enum: ['recruiter'],default:"recruiter"},
  profilePicture: {url:String, publicId:String},
  coverPhoto:{url:String, publicId:String},
  companyWebsite: String,
  companyDescription: String,
  location: String,
  phoneNo: Number,

  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],

  createdAt: { type: Date, default: Date.now }
});
const user= mongoose.model('User',userSchema);
const jobSeeker=mongoose.model('jobseeker',jobSeekerSchema);
const recruiter=mongoose.model('recruiter',recruiterSchema);
const admin=mongoose.model('admin',adminSchema);

module.exports = {user,jobSeeker,recruiter,admin};