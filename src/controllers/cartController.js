const express = require("express");
const Cart = require("../models/Cart");

// Function to get all items in the cart
exports.getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch cart items" });
  }
};

// Function to add a new item to the cart
exports.addToCart = async (req, res) => {
  try {
    const newProduct = new Cart({
      name: req.body.name,
      img: req.body.img,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    res.status(500).send({ error: "Failed to add item to cart" });
  }
};

// Function to remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the request parameters

    const deletedItem = await Cart.findByIdAndDelete(id); // Find and delete the item

    if (!deletedItem) {
      // If the item is not found, return an error response
      res.status(404).send({ error: "Item not found in cart" });
      return;
    }

    res.send({ message: "Item successfully removed from cart" });
  } catch (error) {
    // Handle any errors that occur during deletion
    res.status(500).send({ error: "Failed to remove item from cart" });
  }
};

module.exports = {
  getCartItems: exports.getCartItems,
  addToCart: exports.addToCart,
  removeFromCart: exports.removeFromCart,
};
