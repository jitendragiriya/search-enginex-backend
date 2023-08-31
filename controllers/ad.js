const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Ads = require("../Models/ads");

exports.addad = CatchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const ads = await Ads.create(req.body);
  await res.status(200).json(ads);
});

/**
 * get ad by seach query
 */
exports.getAdBySearchQuery = CatchAsyncError(async (req, res, next) => {
  const ads = await Ads.find({ query: [req.query.keyword] });
  await res.status(200).json(ads);
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
    },
    {
      new: true,
    }
  );
  res.status(200).json(newAd);
});