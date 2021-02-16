/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let movieList = ["Your watched movies"];

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
      filteredList.push(movieList[i]);
    }
  }
  res.render("pages/index", { movieList: filteredList });
});

app.get("/search/:movieName", (req, res) => {
  let movieFile = "movieDescriptions.txt"
  // how to check name without splitting using colon?
  let movieName = req.params.movieName;

  fs.readFile(movieFile, (err, data) => {
    let movieInfo = data.toString().split("\n")
    let splitInfo = ["", "Movie could not be found"]
    for (i = 0; i < movieInfo.length; i++) {
      if (movieInfo[i].includes(`${movieName}:`)) {
        splitInfo = movieInfo[i].split(":")
        break;
      }
    }
    res.render("pages/searchResult", { movieInfo: splitInfo });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});