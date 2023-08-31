const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Ads = require("../Models/ads");

exports.addad = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.create(req.body);
  await res.status(200).json(ads);
});

/**
 * get ad by seach query
 */
exports.getAdBySearchQuery = CatchAsyncError(async (req, res, next) => {
  const host = req.get("origin");
  const ads = await Ads.find({ query: [req.query.keyword], host });
  await res.status(200).json(ads);
});

exports.getAllads = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find();
  await res.status(200).json(ads);
});

exports.updateAdById = CatchAsyncError(async (req, res, next) => {
  const host = req.get("origin");
  const newAd = await Ads.findByIdAndUpdate(
    { _id: req.body.adId },
    {
      query: req.body.query,
      link: req.body.link,
      mainHeading: req.body.mainHeading,
      mainDescription: req.body.mainDescription,
      subHeadings: req.body.subHeadings,
      password: req.body.password,
      host,
    },
    {
      new: true,
    }
  );
  res.status(200).json(newAd);
});
