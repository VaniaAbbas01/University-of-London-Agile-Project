const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

// Routes
router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const {  email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    console.log(password);
    console.log(username);
    console.log(email);

    if (!username || !password || !email) {
        return res.send('All fields are required');
    }

    db.run(`INSERT INTO users (username, pass_word) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            return res.send('Error registering user');
        }

        const userId = this.lastID;

        db.run(`INSERT INTO emails (user_id, email_address) VALUES (?, ?)`, [userId, email], function(err) {
            if (err) {
                return res.send('Error registering email');
            }

            // res.send('User registered successfully');
            res.render('index');
        });
    });
});

module.exports = router;