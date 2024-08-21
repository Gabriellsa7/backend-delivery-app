const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  price: Number,
  quantity: Number,
  discountPrice: Number,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
