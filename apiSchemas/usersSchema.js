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
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employer', 'jobseeker'],
    default: 'jobseeker'
  }
}, { timestamps: true });

const user= mongoose.model('User',userSchema);

module.exports = {user};