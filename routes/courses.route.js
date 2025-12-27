const express = require("express");
const { body } = require("express-validator");
const { validationSchema } = require("../middlewares/validationSchema");
const courseController = require("../Controllers/courses.controller");

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(validationSchema(), courseController.addCourse);

router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
