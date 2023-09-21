const mongoose = require("mongoose");

const ads = new mongoose.Schema(
  {
    query: {
      type: String,
    },
    link: {
      type: String,
    },
    displayLink: {
      type: String,
    },
    mainHeading: {
      type: String,
    },
    mainDescription: {
      type: String,
    },
    subHeadings: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

const Ads = mongoose.model("ad", ads);
module.exports = Ads;
