const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  // get all courses from DB using Course Model
  const courses = await Course.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, data: { course: null } });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      Code: 400,
    });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: { errors: errors.array() } });
  }

  const newCourse = new Course(req.body);

  await newCourse.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    return res
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { course: updatedCourse },
      });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  const result = await Course.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
