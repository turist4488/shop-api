require("dotenv/config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productsRouter = require("./routers/products");
const languagesRouter = require("./routers/languages");
const categoriesRouter = require("./routers/categories");
const { Language } = require("./models/language");

const app = express();
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

const api = process.env.API_URL;

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(`mongo error: ${error.message}`);
    } else {
      console.log("db connection is ready...");
    }
  }
);

const seedLanguages = () => {
  Language.countDocuments(async (err, count) => {
    if (count === 0) {
      const defaultLanguage = new Language({
        locale: "en",
        name: "English",
        isActive: true,
      });
      await defaultLanguage.save();
    }
  });
};

seedLanguages();

app.use(`${api}/products`, productsRouter);
app.use(`${api}/languages`, languagesRouter);
app.use(`${api}/categories`, categoriesRouter);

app.listen(5000, () => {
  console.log(api);
  console.log("server is running on port ");
});
