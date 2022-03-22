const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolesSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  description: {
    type: String,
  },
  permissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Permission",
    },
  ],
});

exports.Role = mongoose.model("Role", rolesSchema);
