const mongoose = require("mongoose");
const { getTranslationsByFields } = require("../utils/getTranslationsByFields");
const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    name: { type: Object, required: true },
    countInStock: {
      type: Number,
      required: true,
    },
    image: String,
    media: [
      {
        type: String,
      },
    ],
    description: {
      type: Object,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

productsSchema.virtual("translations").get(getTranslationsByFields(["name"]));
productsSchema.set("toJSON", {
  virtuals: true,
});

exports.Product = mongoose.model("Product", productsSchema);
