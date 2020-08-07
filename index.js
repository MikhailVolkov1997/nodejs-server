const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

// make folder public static
app.use(express.static("public"));

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    isHome: true,
  });
});

app.get("/courses", (req, res) => {
  res.render("courses", {
    title: "Courses",
    isCourses: true,
  });
});

app.get("/add", (req, res) => {
  res.render("add", {
    title: "Add new course",
    isAdd: true,
  });
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
