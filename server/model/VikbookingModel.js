import mongoose from 'mongoose'

const VikBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hotelPool: {
      type: String,
      required: true
    },
    hotelPool: {
      type: String,
      required: true
    },
    hotelPool: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true
    },

    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    checkInTime: { type: String, required: true },
    guests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    totalPrice: {
      type: Number,
      required: true,
      set: v => (typeof v === 'string' ? Number(v.replace(/,/g, '')) : v)
    },
    nights: { type: Number },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Cancelled'],
      default: 'Completed'
    }
  },
  { timestamps: true }
)

const VikBooking = mongoose.model('VikBooking', VikBookingSchema)

export default VikBooking
