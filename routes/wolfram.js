// Import and use the necessary modules
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Store your Wolfram Alpha App ID in environment variables
const WOLFRAM_APP_ID = process.env.WOLFRAM_APP_ID; 

// Define a POST route to solve equations
router.post("/solve", async (req, res) => {
    const { equation } = req.body; // Extract the equation from the request body

    if (!equation) {
        // Return an error if no equation is provided
        return res.status(400).json({ error: "No equation provided." }); 
    }

    try {
        // Make a GET request to the Wolfram Alpha API with the equation
        const response = await axios.get("http://api.wolframalpha.com/v2/query", {
            params: {
                input: equation,
                appid: WOLFRAM_APP_ID,
                format: "image", // Get the results in image format
                output: "JSON",
            },
        });

        if (response.data.queryresult.error) {
            // Return an error if the API returns an error
            return res.status(500).json({ error: "Error from Wolfram Alpha API." });
        }

        res.json(response.data.queryresult); // Return the query result as JSON
    } catch (error) {
        console.error(error); // Log the error
        // Return an error if the request fails
        res.status(500).json({ error: "Failed to solve the equation." });
    }
});

module.exports = router;