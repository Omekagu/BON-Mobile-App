const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    category: { type: String, required: true }, // E.g., Appetizer, Main Course
    items: [
      {
        foodname: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: [String] },
        reviews: { type: Number },
        rating: { type: Number },
        Liked: { type: Number },
        time: { type: String },
        remaining: { type: Number },
        available: { type: Boolean, default: true }
      }
    ]
  });
  
  const Menu = mongoose.model("Menu", menuSchema);
  
  module.exports = Menu;
  