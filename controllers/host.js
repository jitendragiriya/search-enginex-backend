const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Hosts = require("../Models/hosts");
const OutBounds = require("../Models/outbound"); 

// add out bound
exports.addhost = CatchAsyncError(async (req, res, next) => {
  const visitors = Hosts.count() + 1;
  await Hosts.findOneAndUpdate({ host: req.body.host, visitors });
  const bound = await OutBounds.findOne({ host: req.body.host });
  res.status(200).json(bound);
});
