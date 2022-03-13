const mongoose = require('mongoose')
const { Schema } = mongoose

const productsSchema = new Schema({
  name:  String,
  createdAt: { type: Date, default: Date.now },
  countInStock: Number,
  image: String
});

module.exports = productsSchema