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
    required: true
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
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  phone: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: String,
  profilePicture: String,

  workExperience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date
  }],
  skills: [String],
  resumeUrl: String,
  portfolioUrl: String,

  createdAt: { type: Date, default: Date.now }
});

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },

  companyName: { type: String, required: true },
  companyWebsite: String,
  companyDescription: String,
  location: String,
  contactNumber: String,

  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],

  createdAt: { type: Date, default: Date.now }
});
const user= mongoose.model('User',userSchema);
const jobSeeker=mongoose.model('jobseeker',jobSeekerSchema);
const recruiter=mongoose.model('recruiter',recruiterSchema);
const admin=mongoose.model('admin',adminSchema);

module.exports = {user,jobSeeker,recruiter,admin};