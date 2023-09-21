const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Ads = require("../Models/ads");
const OutBounds = require("../Models/outbound");

exports.addad = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.create(req.body);
  await res.status(200).json(ads);
});

/**
 * get ad by seach query
 */
exports.getAdBySearchQuery = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find({ query: req.query.keyword }); 
  const outBound = await OutBounds.findOne({ host: req.headers.origin }); 
  await res.status(200).json({ ads, outBound });
});

exports.deleteAddById = CatchAsyncError(async (req, res, next) => {
  await Ads.deleteOne({ _id: req.params.id })
    .then((ads) => {
      res.status(200).json(ads);
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "Something went wrong please try again!" });
    });
});

exports.getAllads = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find();
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
    },
    {
      new: true,
    }
  );
  res.status(200).json(newAd);
});
