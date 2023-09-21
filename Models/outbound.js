const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    url: { type: String },
    host: { type: String },
    path: { type: String },
  },
  { timestamps: true }
);

const OutBounds = mongoose.model("outbound", userSchema);

module.exports = OutBounds;
