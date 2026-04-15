import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },

  payment: {
    method: {
      type: String,
      enum: ["COD", "Card", "PayPal"],
      default: "COD"
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    paidAt: Date
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;