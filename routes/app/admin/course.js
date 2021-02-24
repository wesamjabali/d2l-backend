const express = require("express");
const router = express.Router();
const knex = require("../../../database/knex");
const baseURL = "public/data/uploads/content/";
const fs = require("fs");

// Create new course
router.post("/new", async (req, res, next) => {
  try {
    const { title, course_prefix, course_number, section_number } = req.body;

    let existing_course = await knex("d3l_course")
      .where({
        course_prefix: course_prefix,
        course_number: course_number,
        section_number: section_number,
      })
      .select("id");

    if (existing_course.length > 0) {
      return res.sendState(409);
    }

    const a = await knex("d3l_course").insert({
      title: title,
      course_prefix: course_prefix,
      course_number: course_number,
      section_number: section_number,
    });

    var [new_id] = await knex("d3l_course")
      .where({
        course_prefix: course_prefix,
        course_number: course_number,
        section_number: section_number,
      })
      .select("id");
    new_id = new_id.id;

    let courseDir = baseURL + new_id + "/";

    fs.mkdir(courseDir, (err) => {
      if (err) {
        if (err.code == "EEXIST") {
        }
      }
    });

    res.status(201).json({});
  } catch (err) {
    next(err);
  }
});

// Remove course
router.post("/delete", async (req, res, next) => {
  try {
    const { course_id } = req.body;

    /*
    // Ensure course exists before deleting
    let existing_course = await knex("d3l_course")
    .where({
      id: course_id
    }).select();

    if (existing_course.length == 0) {
      res.status(409).json({});
      throw new Error("Cannot delete nonexistent course.");
    }
    */

    // Update courses table via delete
    await knex("d3l_course")
      .where({
        id: course_id,
      })
      .del();

    res.status(201).json({});
  } catch (err) {
    next(err);
  }
});

// Get all courses
router.get("/getAllCourses", async (req, res, next) => {
  try {
    const courses = await knex.select(["id", "title"]).from("d3l_course");
    res.status(200).json({ courses });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
