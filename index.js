const express = require("express");
const app = express();

const port = 8080;

const path = require("path");
const { v4: uuidv4 } = require('uuid');  //Universally Unique Identifier (UUID package)
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));  // override the request method

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love developing.",
    },
    {
        id: uuidv4(),
        username: "pavankhare",
        content: "Let hardwork and consistency be your best friends",
    },
    {
        id: uuidv4(),
        username: "manojkhare",
        content: "Life is beautiful!",
    },

];

// Root Route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Index Route - to get data for all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Create & new Route - to add a new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Redirect & creating UUID
app.post("/posts", (req, res) => {
    // console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4();  //function to create unique id
    posts.push({ id, username, content }); 
    res.redirect("/posts");
});

// Show Route - to get one post using id
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);  // find the post in posts array
    console.log(post);
    res.render("show.ejs", { post });
});

// Update Route - to update specific post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// Edit Route - serve the edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// Destroy Route - to delete specific post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);  //filter out the posts except post with id
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 