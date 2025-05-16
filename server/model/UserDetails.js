import mongoose from 'mongoose'

const UserDetailsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    referralCode: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String
    },
    profileImage: { type: String },
    dob: { type: String },
    gender: { type: String },
    address: { type: String },
    deviceType: { type: String },
    userCountry: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'], // You can have different roles for admin and users
      default: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'UserInfo'
  }
)

const User = mongoose.model('UserInfo', UserDetailsSchema)

export default User
