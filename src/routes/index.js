const express = require("express");
const router = express.Router();

const productCartRouter = require("./products-cart");

router.use("/products-cart", productCartRouter);

module.exports = router;
