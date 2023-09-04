// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Posts = require("../Models/posts");

exports.addPost = CatchAsyncError(async (req, res, next) => {
  let posts = await Posts.find({ searchQuery: req.body.searchQuery });
  if (posts?.length) {
    await res.status(200).json(posts);
  } else {
    posts = await Posts.create(req.body);
    await res.status(200).json(posts);
  }
});

exports.getPostBySearchQuery = CatchAsyncError(async (req, res, next) => {
  const posts = await Posts.find({ searchQuery: req.query.keyword });
  await res.status(200).json(posts);
});
