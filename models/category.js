const mongoose = require("mongoose");
const { Schema } = mongoose;
const autopopulate = require("mongoose-autopopulate");
const { getTranslationsByFields } = require("../utils/getTranslationsByFields");

const categoriesSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    name: {
      type: Object,
      required: [true, "can't be blank"],
    },
    description: {
      type: Object,
    },
    icon: String,
    thumbnail: String,
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: true,
      },
    ],
    isActive: Boolean,
  },
  { timestamps: true }
);

categoriesSchema
  .virtual("translations")
  .get(getTranslationsByFields(["name", "description"]))
  .set(function (translations) {
    this.name = translations["name"];
    this.description = translations["description"];
  });

categoriesSchema.set("toJSON", {
  virtuals: true,
});

categoriesSchema.plugin(autopopulate);

exports.Category = mongoose.model("Category", categoriesSchema);
