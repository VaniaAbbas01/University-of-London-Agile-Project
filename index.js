/**
 * index.js
 * This is your main app entry point
 */

// Set up express, bodyparser and EJS
require("dotenv").config(); // Load environment variables
const express = require("express");
const app = express();
const session = require("express-session");

const port = 3000;
var bodyParser = require("body-parser");
// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using https
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // set the app to use ejs for rendering
app.use(express.static(__dirname + "/public")); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); // bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
  }
});

// Middleware to check if the user is logged in
function checkAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect("/");
  }
}

// Landing page route
app.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect("/taker");
  } else {
    res.render("index");
  }
});

// Home page route
// Home page route
app.get("/taker", checkAuth, (req, res) => {
  // Fetch the content from the content table where the user_id matches the session userId
  db.all(
    `SELECT body,timestamp,id FROM content WHERE user_id = ?`,
    [req.session.userId],
    (err, content) => {
      if (err) {
        return res.send("Error fetching content");
      }

      // Pass both username and content to the EJS template in a single object
      res.render("taker", {
        username: req.session.username,
        content: content, // content is an array of objects with a 'body' property
      });
    }
  );
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/");
  });
});

// Add all the route handlers in usersRoutes to the app under the path /users
const notesRoutes = require("./routes/notes");
app.use("/notes", notesRoutes);

// Add all the route handlers in usersRoutes to the app under the path /users
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const bodyParser = require("body-parser");

// To handle text/plain requests
app.use(bodyParser.text({ type: "text/plain" }));
