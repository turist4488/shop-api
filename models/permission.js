const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionsSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  description: {
    type: String,
  },
});

exports.Permission = mongoose.model("Permission", permissionsSchema);
