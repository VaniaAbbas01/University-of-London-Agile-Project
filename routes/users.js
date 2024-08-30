const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Routes
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !password || !email) {
    return res.send("All fields are required");
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    `INSERT INTO users (username, pass_word) VALUES (?, ?)`,
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.send("Error registering user");
      }

      const userId = this.lastID;

      db.run(
        `INSERT INTO emails (user_id, email_address) VALUES (?, ?)`,
        [userId, email],
        function ( err) {
          if (err) {
            return res.send("Error registering email");
          }

          res.redirect("/homepage");
        }
      );
    }
  );
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.send("User not found");
    }

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
