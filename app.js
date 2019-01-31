const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");

const config = require("./config");
const passportConfig = require("./config/passportConfig");
require("./services/cache");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const app = express();
mongoose.connect(
  config.mongodbUri,
  {
    useNewUrlParser: true
  },
  error => {
    if (error) throw new Error(error);
    console.log("Connected to DB");
  }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(morgan("dev"));
app.use(passport.initialize());

passportConfig(passport);

app.use("/api", authRoutes);
app.use("/api/blog", blogRoutes);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`App listening on port ${port}`));
