import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: Number, required: true },

  products: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

export default mongoose.model("Cart", cartSchema);