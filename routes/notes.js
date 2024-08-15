const express = require("express");
const router = express.Router();

router.use(express.text());

router.get("/", (req, res) => {
  res.render("homepage");
});
router.post("/submitNote", (req, res) => {
  let body = req.body; // Now treating body as plain text

  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  if (!body) {
    return res.status(400).send("Note content cannot be empty");
  }

  db.run(
    `INSERT INTO content (user_id, body) VALUES (?, ?)`,
    [userId, body], // Ensure body is a string
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving note");
      }
      res.send("SUCCESS");
    }
  );
});

module.exports = router;
