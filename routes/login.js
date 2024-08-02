const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    console.log(username);
    console.log(password);

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) {
            return res.send('User not found');
        }

        const passwordIsValid = bcrypt.compareSync(password, user.pass_word);

        if (!passwordIsValid) {
            return res.send('Invalid password');
        }

        // res.send('Login successful');
        res.render('index');
    });
});

module.exports = router;