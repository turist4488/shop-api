const mongoose = require("mongoose");
const { Schema } = mongoose;
const autopopulate = require("mongoose-autopopulate");

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
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

categoriesSchema.set("toJSON", {
  virtuals: true,
});
categoriesSchema.plugin(autopopulate);

exports.Category = mongoose.model("Category", categoriesSchema);
