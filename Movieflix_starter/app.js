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

let movieList = ["test", "test2", "Gladiator"];

app.get("/", (req, res) => res.render("pages/index", { movieList: movieList }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  console.log(formData);
  movieList = formData.movies.split(",");
  console.log(movieList);
  res.render("pages/index", { movieList: movieList });
});

app.get("/myListQueryString", (req, res) => {
  let filteredList = [];
  let { movie1, movie2 } = req.query;
  
  for (let i = 0; i < movieList.length; i++ ){
    if ((movie1 == movieList[i].trim() || movie2 == movieList[i].trim() )) {
      filteredList.push(movieList[i])
    }
  }
  res.render("pages/index", { movieList: filteredList });
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});