require("dotenv").config();

const express = require("express");

const httpStatusText = require('./utils/httpStatusText')

const app = express();




const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));


app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.use((req, res, next) => {
    res.status(404).json({status: httpStatusText.ERROR, message: "Resource not found"});
});


app.listen(4000, () => {
  console.log("listening on port: 4000");
});
