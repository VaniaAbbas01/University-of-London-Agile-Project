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

router.get("/edit/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  db.get(`SELECT * FROM content WHERE id = ? AND user_id = ?`, [noteId, userId], (err, note) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving note");
    }
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.render("editNote", { note });
  });
});

router.put("/edit/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;
  const newContent = req.body; // Assuming the content is passed as plain text

  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  db.run(
    `UPDATE content SET body = ? WHERE id = ? AND user_id = ?`,
    [newContent, noteId, userId],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating note");
      }
      res.send("SUCCESS");
    }
  );
});

// Delete note route
router.delete("/delete/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
      return res.status(401).send("User not logged in");
  }

  db.run(`DELETE FROM content WHERE id = ? AND user_id = ?`, [noteId, userId], function (err) {
      if (err) {
          console.error(err);
          return res.status(500).send("Error deleting note");
      }

      if (this.changes === 0) {
          return res.status(404).send("Note not found or not authorized to delete");
      }

      res.send("SUCCESS");
  });
});

module.exports = router;