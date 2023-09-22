const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Ads = require("../Models/ads");
const Calls = require("../Models/calls");
const OutBounds = require("../Models/outbound");

exports.addad = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.create({
    ...req.body,
    host: req.headers.origin,
    userId: req?.user?._id,
  });
  await res.status(200).json(ads);
});

/**
 * get ad by seach query
 */
exports.getAdBySearchQuery = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find({
    query: req.query.keyword,
    isdeleted: false,
  }).select("-userId");
  const calls = await Calls.count() + 1;
  // const outBound = await OutBounds.findOne({ host: req.headers.origin });
  await res.status(200).json({ ads, outBound: null });
  await Calls.create({ calls, query: req.query.keyword });
});

exports.deleteAddById = CatchAsyncError(async (req, res, next) => {
  await Ads.findByIdAndUpdate(
    { _id: req.params.id },
    {
      isdeleted: true,
      userId: req?.user?._id,
    },
    {
      new: true,
    }
  )
    .then((s) => {
      res.status(200).json(s);
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "Something went wrong please try again!" });
    });
});

exports.getAllads = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find({ isdeleted: false });
  await res.status(200).json(ads);
});

exports.updateAdById = CatchAsyncError(async (req, res, next) => {
  const newAd = await Ads.findByIdAndUpdate(
    { _id: req.body.adId },
    {
      query: req.body.query,
      link: req.body.link,
      mainHeading: req.body.mainHeading,
      mainDescription: req.body.mainDescription,
      subHeadings: req.body.subHeadings,
      displayLink: req.body.displayLink,
      userId: req?.user?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json(newAd);
});
