import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
  websiteName: String,
  websitePassword: String,
  userName: String,
  color: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const UserDetails = mongoose.model('UserDetail', userDetailsSchema);
