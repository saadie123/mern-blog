const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const config = require("./config");

const authRoutes = require("./routes/auth");

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

app.use("/api", authRoutes);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`App listening on port ${port}`));
