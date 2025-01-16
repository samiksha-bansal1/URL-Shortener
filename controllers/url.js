const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ err: "url is required" });
  }

  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    id: shortID,
    user: req.user,
    urls: allUrls,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
