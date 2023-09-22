const mongoose = require("mongoose");

const host = new mongoose.Schema(
  {
    host: {
      type: String,
    },
  },
  { timestamps: true }
);

const Hosts = mongoose.model("hosts", host);
module.exports = Hosts;
