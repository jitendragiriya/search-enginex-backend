const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const OutBounds = require("../Models/outbound"); 

// add out bound
exports.addOutBound = CatchAsyncError(async (req, res, next) => {
  await OutBounds.deleteOne({ host: req.body.host });
  const bound = await OutBounds.create(req.body);
  res.status(200).json(bound);
});
