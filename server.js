const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/weather", (req, res) => {
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/33.433866,-79.121298`;
  axios({
    url: url,
    responseType: "JSON"
  })
    .then(data => res.send(data.data))
    .catch(error => console.log("Error:", error.message));
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
