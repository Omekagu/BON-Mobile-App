const menuSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    category: { type: String, required: true }, // E.g., Appetizer, Main Course
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
        available: { type: Boolean, default: true }
      }
    ]
  });
  
  const Menu = mongoose.model("Menu", menuSchema);
  
  module.exports = Menu;
  