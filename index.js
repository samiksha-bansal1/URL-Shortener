const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkForAuthenication, restrictTo } = require("./middlewares/auth");
const urlRouter = require("./routes/urlRouter");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/userRouter");
const app = express();
const PORT = 8000;

//database connection
const { connectMongoDB } = require("./connection");
const MONGO_URL = "mongodb://127.0.0.1:27017/url-shortner";
connectMongoDB(MONGO_URL)
  .then(() => {
    console.log("Mongo DB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenication);

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/url", restrictTo(["ADMIN", "NORMAL"]), urlRouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

//server
app.listen(PORT, () => {
  console.log("Server started at PORT:", PORT);
});
