// Import and use the necessary modules
const express = require("express");
const router = express.Router();

router.use(express.text()); // Middleware to parse text/plain bodies

// Route to render the create note page
router.get("/", (req, res) => {
  res.render("createNote");
});

// Route to handle note submission
router.post("/submitNote", (req, res) => {
  let body = req.body; // Now treating body as plain text

  const userId = req.session.userId;

  // Check if the user is logged in
  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  // Check if the note content is not empty
  if (!body) {
    return res.status(400).send("Note content cannot be empty");
  }

  // Insert the note into the content table
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

// Route to render the edit note page
router.get("/edit/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;

  // Check if the user is logged in
  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  // Retrieve the note from the content table
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

// Route to handle note editing
router.put("/edit/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;
  const newContent = req.body; // Assuming the content is passed as plain text

  // Check if the user is logged in
  if (!userId) {
    return res.status(401).send("User not logged in");
  }

  // Update the note in the content table
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

// Route to handle note deletion
router.delete("/delete/:id", (req, res) => {
  const noteId = req.params.id;
  const userId = req.session.userId;

  // Check if the user is logged in
  if (!userId) {
      return res.status(401).send("User not logged in");
  }

  // Delete the note from the content table
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