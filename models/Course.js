const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

class Course {
  constructor(course) {
    this.title = course.title;
    this.price = course.price;
    this.img = course.img;
    this.id = uuid();
  }

  get data() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.data);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      );
    });
  }

 static async update(updatedCourse) {
    const courses = await Course.getAll()

    const idx = courses.findIndex(course => course.id === updatedCourse.id)

    courses[idx] = updatedCourse
    
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      );
    });

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "courses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const courses = await Course.getAll()

    return courses.find(course => course.id === id)
  }
}

module.exports = Course;
