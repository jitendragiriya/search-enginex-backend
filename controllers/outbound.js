const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const OutBounds = require("../Models/outbound");

// add out bound
exports.addOutBound = CatchAsyncError(async (req, res, next) => {
  const bound = await OutBounds.findOneAndUpdate({ host: req.body.host });
  res.status(200).json(bound);
});
