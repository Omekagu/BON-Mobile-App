const mongoose = require('mongoose')

const UserDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // You can have different roles for admin and users
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },   
},{
  collection: 'UserInfo'
});

mongoose.model('UserInfo', UserDetailsSchema)