import React from "react";

const WeatherData = ({ weatherData }) => {
  let data = {};
  data.currently = { temperature: "-", windGust: "-", summary: "-" };
  if (weatherData !== "") {
    data = JSON.parse(weatherData);
  }

  console.log("Display Data:", data);
  return (
    <div>
      <p>
        <em>Location:</em>
        {`Temperature: ${Math.round(data.currently.temperature)}, Wind Gust: ${
          data.currently.windGust
        }, Summary: ${data.currently.summary}`}
      </p>
    </div>
  );
};

export default WeatherData;
