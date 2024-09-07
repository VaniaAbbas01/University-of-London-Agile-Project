// Import and use the necessary modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Route to render the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Route to handle user registration
router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  // Check if all fields are provided
  if (!username || !password || !email) {
    return res.send("All fields are required");
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insert the new user into the users table
  db.run(
    `INSERT INTO users (username, pass_word) VALUES (?, ?)`,
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.send("Error registering user");
      }

      const userId = this.lastID;

      // Insert the email into the emails table
      db.run(
        `INSERT INTO emails (user_id, email_address) VALUES (?, ?)`,
        [userId, email],
        function (err) {
          if (err) {
            return res.send("Error registering email");
          }

          res.redirect("/homepage");
        }
      );
    }
  );
});

// Route to render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Route to handle user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the users table
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.send("User not found");
    }

    // Compare the provided password with the stored hashed password
    const passwordIsValid = bcrypt.compareSync(password, user.pass_word);

    if (!passwordIsValid) {
      return res.send("Invalid password");
    }

    // Create a session for the user
    req.session.userId = user.user_id;
    req.session.username = user.username;
    
    console.log(req.session.userId, req.session.username);

    res.redirect("/homepage");
  });
});

module.exports = router; 