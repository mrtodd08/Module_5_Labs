// server.js
const express = require("express");

// Create two different instances of express apps
const app1 = express();
const app2 = express();

// Server 1 - Running on port 3000
app1.get("/", (req, res) => {
  res.send("Hello from Server 1 (Port 3000)");
});

app1.listen(3000, () => {
  console.log("Server 1 is running on port 3000");
});

// Server 2 - Running on port 4000
app2.get("/", (req, res) => {
  res.send("Hello from Server 2 (Port 4000)");
});

app2.listen(4000, () => {
  console.log("Server 2 is running on port 4000");
});
