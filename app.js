const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At ultrices mi tempus imperdiet nulla. Sem fringilla ut morbi tincidunt augue interdum.";
const contactContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At ultrices mi tempus imperdiet nulla. Sem fringilla ut morbi tincidunt augue interdum.";
const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { startingContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { startingContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        newPostTitle: post.title,
        newPostContent: post.content
      });
    };
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent,
  };

  posts.push(post);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
