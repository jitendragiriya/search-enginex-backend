const mongoose = require("mongoose");

const posts = new mongoose.Schema(
  {
    kind: { type: Object },
    url: { type: Object },
    queries: { type: Object },
    context: { type: Object },
    searchInformation: { type: Object },
    items: { type: Object },
    searchQuery: { type: String },
  },
  { timestamps:true }
);

const Posts = mongoose.model("post", posts);

module.exports = Posts;
