const mongoose = require("mongoose");
const { Schema } = mongoose;

const languagesSchema = new Schema(
  {
    locale: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

languagesSchema.statics.findActive = function (cb) {
  return this.find({ isActive: true }, cb);
};

exports.Language = mongoose.model("Language", languagesSchema);
