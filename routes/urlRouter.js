const express = require("express");
const {
  handleGenerateShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/analytics/:shortId", handleGetAnalytics);

router.post("/", handleGenerateShortUrl);

module.exports = router;
