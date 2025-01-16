const express = require("express");
const { handleHomePage } = require("../controllers/static");

const router = express.Router();

router.get("/", handleHomePage);

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
