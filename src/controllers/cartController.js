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
  const { img, productId, name, price, quantity, discountPrice } = req.body;

  try {
    // Check if the product exists in the cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      // Update existing product quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // Add new product to cart
      const newCartItem = new Cart({
        productId,
        name,
        price,
        quantity,
        img: JSON.stringify(img),
        discountPrice,
      });
      await newCartItem.save();
    }

    // Get the updated cart
    const updatedCart = await Cart.find().populate("productId");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update the quantity of an item in the cart
exports.updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists in the cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      // Update existing product quantity
      existingCartItem.quantity = quantity;
      await existingCartItem.save();
      res.status(200).json(existingCartItem);
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  updateCartQuantity: exports.updateCartQuantity,
};
