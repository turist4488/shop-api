const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    hash: String,
    salt: String,
    roles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", usersSchema);
