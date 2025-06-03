import mongoose from 'mongoose'

const UserDetailsSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    surname: { type: String },
    referralCode: { type: String },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      // Only required for local sign ups
      required: function () {
        return !this.provider
      }
    },
    provider: {
      type: String,
      enum: ['google', 'facebook', 'apple', null],
      default: null
    },
    providerId: { type: String }, // Unique id from Google/Facebook/Apple
    phoneNumber: { type: String },
    profileImage: { type: String },
    dob: { type: String },
    gender: { type: String },
    address: { type: String },
    deviceType: { type: String },
    userCountry: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
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
