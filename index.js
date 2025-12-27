const express = require("express");

const app = express();

const mongoose = require("mongoose");

const url =
  "mongodb+srv://AgmadRagab:learn2412@learn-mongodb.djiozux.mongodb.net/<codeZone>?appName=learn-mongodb";

mongoose.connect(url).then(() => {
  console.log("mongodb server started");
});

app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(4000, () => {
  console.log("listening on port: 4000");
});
