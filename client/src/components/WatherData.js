import React from "react";

const WeatherData = ({ weatherData, locationValue }) => {
  let data = {};
  data.currently = { temperature: "-", windGust: "-", summary: "-" };
  const weatherConditions = {
    temperature: "Current Temperature",
    apparentTemperature: "Apparent Temperature",
    humidity: "Humidity",
    precipProbability: "Precipitation %",
    precipType: "Preciptitation Type",
    windGust: "Wind Gust",
    cloudCover: "Cloud Cover",
    uvIndex: "UV Index",
    summary: "Summary"
  };
  if (weatherData !== "") {
    data = JSON.parse(weatherData);
  }
  return (
    <div>
      <em>Location:{locationValue}</em>
      <div>
        <div className="cat">Temperature</div>
        <div className="value">{Math.round(data.currently.temperature)}</div>
      </div>
      <div>
        <div className="cat">Wind Gust</div>
        <div className="value">{data.currently.windGust}</div>
      </div>
      <div>
        <div className="cat">Summary</div>
        <div className="value">{data.currently.summary}</div>
      </div>
    </div>
  );
};

export default WeatherData;
