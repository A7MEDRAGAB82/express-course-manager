require("dotenv").config();

const express = require("express");
const cors = require("cors");

const httpStatusText = require("./utils/httpStatusText");

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

// global middleware for not found routes
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: httpStatusText.ERROR, message: "Resource not found" });
});

// global error handling middleware
app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({ status: error.statusText || httpStatusText.ERROR, message: error.message , code: error.statusCode  || 500, data: error.data || null });
});

app.listen(4000, () => {
  console.log("listening on port: 4000");
});
