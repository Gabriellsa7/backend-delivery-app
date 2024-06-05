const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  price: Number,
  quantity: Number,
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
