require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productsSchema = require("./models/Products");

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

const Product = mongoose.model('Product', productsSchema);
const api = process.env.API_URL

app.get(`${api}/products`, async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

app.post(`${api}/products`, ((req, res) => {
  const product = new Product(req.body)
  product.save(err => {
    if (err) {
      console.log(err)
      res.send('error occurred')
    }
    res.send(product)
  })
}))

mongoose.connect(process.env.DB_CONNECTION,{ user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('db connection is ready...');
  })
  .catch(err => {
    console.log(err)
  })

app.listen(5000, () => {
  console.log(api)
  console.log('server is running on port ');
})