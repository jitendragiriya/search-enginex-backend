const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);

module.exports = Users;
