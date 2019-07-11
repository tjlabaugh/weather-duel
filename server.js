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
app.post("/weather", (req, res) => {
  // PI = 33.433866,-79.121298
  // PP = 40.081970, -74.068514

  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/`;
  // const { latitude, longitude } = req.body.locationOne;

  function getLocationOne() {
    const { latitude, longitude } = req.body.locationOne;
    return axios({
      url: `${url}${latitude},${longitude}`,
      responseType: "JSON"
    });
  }

  function getLocationTwo() {
    const { latitude, longitude } = req.body.locationTwo;
    return axios({
      url: `${url}${latitude},${longitude}`,
      responseType: "JSON"
    });
  }

  axios
    .all([getLocationOne(), getLocationTwo()])
    .then(
      axios.spread((locationOneData, locationTwoData) => {
        const data = JSON.stringify({
          locationOne: locationOneData.data,
          locationTwo: locationTwoData.data
        });
        res.send(data);
      })
    )
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
