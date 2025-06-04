import mongoose from 'mongoose'
const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    pool: { type: String, required: true },
    hotelName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    checkInTime: { type: String, required: true },
    guests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    nights: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Completed', 'Pending'], required: true },
    hotelDetails: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', BookingSchema)

export default Booking
