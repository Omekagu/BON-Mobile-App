import mongoose from 'mongoose'

const BonamiCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
      required: true
    },
    cardNumber: { type: String },
    province: { type: String, required: true },
    address: { type: String, required: true },
    Id: { type: String, required: true }, // example extra field
    issuedDate: { type: Date, default: Date.now },
    expiryDate: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'BonamiCards'
  }
)

const BonamiCard = mongoose.model('BonamiCards', BonamiCardSchema)

export default BonamiCard
