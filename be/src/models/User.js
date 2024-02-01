const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    birthday: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
      default: 2000,
    },
    gender: {
      type: Number,
      default: 1,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "reader"],
      default: "reader",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
