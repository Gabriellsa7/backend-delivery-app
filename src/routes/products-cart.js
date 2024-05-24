const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/", getCartItems);

router.post("/", addToCart);

router.delete("/:id", removeFromCart); // Use the controller function

module.exports = router;
