const mongoose = require("mongoose");

const ads = new mongoose.Schema({
  query: [
    {
      type: Object,
    },
  ],
  link: {
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
});

const Ads = mongoose.model("ad", ads);
module.exports = Ads;