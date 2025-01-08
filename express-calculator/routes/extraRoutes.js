const express = require("express");
const router = express.Router();

// Random number route with min and max parameters
router.get("/random", (req, res) => {
  const max = parseFloat(req.query.max);
  const min = parseFloat(req.query.min) || 0; // Default min to 0 if not provided

  // Validate if max is a number
  if (isNaN(max)) {
    return res.status(400).send('Please provide a valid number for "max".');
  }

  if (min > max) {
    return res.status(400).send('"min" cannot be greater than "max".');
  }

  // Generate a random number between min and max (inclusive)
  const randomNum = Math.random() * (max - min) + min;
  res.send(`Random number between ${min} and ${max}: ${randomNum}`);
});

module.exports = router;
