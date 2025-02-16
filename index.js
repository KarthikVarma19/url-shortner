const express = require("express");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const shortUrlRoute = require("./routes/shortUrl");
const analyticsRoute = require("./routes/analyticsRoute");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const {restrictToLoggedInUserOnly} = require("./middlewares/auth");
const { connectToMongoDb } = require("./connect");
const dotenv = require("dotenv");
const URL = require("./models/url");
const path = require("path");

const app = express();
const PORT = 8001;

dotenv.config();

const URI = process.env.URI;
connectToMongoDb(URI).then(() => {
  console.log("MongoDB Connected");
});


app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());

//Home Page
app.use("/user", userRoute);
app.use("/", staticRoute);
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", shortUrlRoute);
app.use("/analytics", analyticsRoute);





app.listen(PORT, () => {
  console.log(`Server Started Running at ${PORT}`);
});
