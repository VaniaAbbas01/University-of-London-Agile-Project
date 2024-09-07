/**
 * index.js
 * This is your main app entry point
 */

// Load environment variables
require("dotenv").config();

// Import and use the necessary modules
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using https
  })
);

// Middleware to prevent caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To handle text/plain requests
app.use(bodyParser.text({ type: "text/plain" }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set location of static files
app.use(express.static(__dirname + "/public"));

// Import and use the Wolfram Alpha routes
const wolframRoutes = require("./routes/wolfram");
app.use("/wolfram", wolframRoutes);

// Add all the route handlers in notesRoutes to the app under the path /notes
const notesRoutes = require("./routes/notes");
app.use("/notes", notesRoutes);

// Add all the route handlers in userRoutes to the app under the path /users
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

// Set up SQLite
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); // bail out if we can't connect to the DB
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
    res.redirect("/homepage");
  } else {
    res.render("index");
  }
});

// Home page route
app.get("/homepage", checkAuth, (req, res) => {
  // Fetch content from the content table where the user_id matches the session userId
  db.all(
    `SELECT body,timestamp,id FROM content WHERE user_id = ?`,
    [req.session.userId],
    (err, content) => {
      if (err) {
        return res.send("Error fetching content");
      }

      // Pass both username and content to the EJS template in a single object
      res.render("homepage", {
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
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out. Please try again.");
    }
    res.clearCookie('connect.sid'); // Clear the session cookie if needed
    res.redirect("/"); // Redirect to homepage or login page
  });
});

// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});