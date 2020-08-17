const { Router } = require("express");
const Course = require("../models/Course");

const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add new course",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const { body } = req;

  const course = new Course(body);

  await course.save();

  res.redirect("/courses");
});

module.exports = router;
