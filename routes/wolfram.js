// routes/wolfram.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const WOLFRAM_APP_ID = process.env.WOLFRAM_APP_ID; // Store your Wolfram Alpha App ID in environment variables

router.post("/solve", async (req, res) => {
    const { equation } = req.body;

    if (!equation) {
        return res.status(400).json({ error: "No equation provided." });
    }

    try {
        const response = await axios.get("http://api.wolframalpha.com/v2/query", {
            params: {
                input: equation,
                appid: WOLFRAM_APP_ID,
                format: "image", // We will get the results in image format
                output: "JSON",
            },
        });

        if (response.data.queryresult.error) {
            return res.status(500).json({ error: "Error from Wolfram Alpha API." });
        }

        res.json(response.data.queryresult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to solve the equation." });
    }
});

module.exports = router;
