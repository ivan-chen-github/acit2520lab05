/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  console.log(formData);
  let movieList = formData.movies.split(",")
  console.log(movieList)

  for (let i=0; i < movieList.length; i++){
    res.render("pages/index", { movie: movieList[i] });
  }
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});