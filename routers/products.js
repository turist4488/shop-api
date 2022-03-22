const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(products);
});

router.post("/", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        success: false,
      });
    });
});

module.exports = router;
