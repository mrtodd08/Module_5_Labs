const express = require("express");
const calculatorController = require("./calculatorController.js");
const router = express.Router();
router.get("/add", (req, res) => {
  calculatorController.addNumbers(req, res);
});
module.exports = router;
