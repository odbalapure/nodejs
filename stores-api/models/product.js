const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    require: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      // Error message to show if the company is not one amongst the 4
      message: "{VALUE} is not supported"
    },
    require: [true, "Product company must be provided"],
  },
});

module.exports = mongoose.model("Product", productScheme);
