const express = require("express");
const app = express();
const extraRoutes = require("./routes/extraRoutes"); // Import extra routes
const request = require("supertest"); // To make HTTP requests to the server
const app = require("./app"); // Import your app

// Port the server will listen to
const port = 3000;

// let server; // Removed redundant declaration
// Define routes for basic operations
app.get("/", (req, res) => {
  res.send("Welcome to the Express Calculator!");
});

// Addition Route
app.get("/add", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .send('Please provide valid numbers for "a" and "b".');
  }

  const result = a + b;
  res.send(`The result of ${a} + ${b} is: ${result}`);
});

// Subtraction Route
app.get("/subtract", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .send('Please provide valid numbers for "a" and "b".');
  }

  const result = a - b;
  res.send(`The result of ${a} - ${b} is: ${result}`);
});

// Multiplication Route
app.get("/multiply", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .send('Please provide valid numbers for "a" and "b".');
  }

  const result = a * b;
  res.send(`The result of ${a} * ${b} is: ${result}`);
});

// Division Route
app.get("/divide", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .send('Please provide valid numbers for "a" and "b".');
  }

  if (b === 0) {
    return res.status(400).send("Cannot divide by zero.");
  }

  const result = a / b;
  res.send(`The result of ${a} ÷ ${b} is: ${result}`);
});

// Use the extra routes under the '/extra' prefix
app.use("/extra", extraRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});

// For testing purposes with Jest or similar framework:
beforeAll(async () => {
  server; // No need for additional code here, as server is already initialized
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve)); // Ensures server is shut down after tests
});
