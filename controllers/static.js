const URL = require("../models/url");

async function handleHomePage(req, res) {
  if (!req.user) return res.redirect("/login");

  const allUrls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allUrls,
    user: req.user,
  });
}

module.exports = {
  handleHomePage,
};
