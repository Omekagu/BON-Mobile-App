const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  amenities: [String], // Array of amenities
  pricePerNight: { type: Number, required: true },
  images: [String], // Array of image URLs
  rating: { type: Number, default: 0 },
  contact: {
    phone: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;