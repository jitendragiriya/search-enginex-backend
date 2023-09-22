const mongoose = require("mongoose");

const call = new mongoose.Schema(
  {
    calls: {
      type: Number,
    },
    query: {
      type: String,
    },
  },
  { timestamps: true }
);

const Calls = mongoose.model("call", call);
module.exports = Calls;
