const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], required: true },
  pricePerNight: { type: Number, required: true },
  images: { type: [String], required: true },  
  owners: { 
    ownerImage: {type: String, required: true},
    name: {type: String, required: true} 
  },  
  reviews: { type: Number, required: true },  
  rating: { type: Number, required: true, min: 0, max: 5 },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
