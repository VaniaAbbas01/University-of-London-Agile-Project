const crypto = require('crypto'); // Import the crypto module

// Generate a random 32-byte secret key and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');

// Log the generated secret key to the console
console.log(`Your secret key: ${secretKey}`);
