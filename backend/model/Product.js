const mongoose = require("mongoose");

// Create schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
