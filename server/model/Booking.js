import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
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
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Cancelled'],
      default: 'Completed'
    }
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', BookingSchema)

export default Booking
