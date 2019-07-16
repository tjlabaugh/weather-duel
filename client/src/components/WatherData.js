import React from "react";
import Condition from "./Condition";

const WeatherData = ({
  locationOneData,
  locationTwoData,
  locationOneName,
  locationTwoName
}) => {
  let dataOne;
  let dataTwo;
  const weatherConditions = {
    currently: {
      temperature: "Current Temperature",
      apparentTemperature: "Apparent Temperature",
      humidity: "Humidity",
      precipProbability: "Precipitation %",
      windGust: "Wind Gust",
      cloudCover: "Cloud Cover",
      uvIndex: "UV Index",
      summary: "Summary"
    },
    daily: {
      temperatureHigh: "Temperature High",
      temperatureLow: "Temperature Low",
      apparentTemperatureHigh: "Apparent Temperature High",
      apparentTemperatureLow: "Apparent Temperature Low",
      summary: "Daily Summary"
    }
  };

  if (locationOneData !== "") {
    dataOne = JSON.parse(locationOneData);
  }
  if (locationTwoData !== "") {
    dataTwo = JSON.parse(locationTwoData);
  }

  const locationOne = locationOneName && locationOneName.split(", ");
  const locationTwo = locationTwoName && locationTwoName.split(", ");

  return (
    <div className="weather-data-display">
      <div className="locations">
        <div className="location">
          <span className="location_city-name">
            {locationOne && locationOne[0]}
          </span>
          <span className="location_secondary-name">
            {locationOne && `${locationOne[1]}, ${locationOne[2]}`}
          </span>
        </div>
        <div className="location">
          <span className="location_city-name">
            {locationTwo && locationTwo[0]}
          </span>
          <span className="location_secondary-name">
            {locationTwo && `${locationTwo[1]}, ${locationTwo[2]}`}
          </span>
        </div>
      </div>
      <div className="category">
        <span>Current</span>
      </div>
      {Object.keys(weatherConditions.currently).map((key, index) => (
        <Condition
          locationOneConditionData={dataOne ? dataOne.currently[key] : "-"}
          locationTwoConditionData={dataTwo ? dataTwo.currently[key] : "-"}
          conditionName={weatherConditions.currently[key]}
          key={`current-${key}`}
        />
      ))}
      <div className="category">
        <span>Daily</span>
      </div>
      {Object.keys(weatherConditions.daily).map((key, index) => (
        <Condition
          locationOneConditionData={dataOne ? dataOne.daily[key] : "-"}
          locationTwoConditionData={dataTwo ? dataTwo.daily[key] : "-"}
          conditionName={weatherConditions.daily[key]}
          key={`daily-${key}`}
        />
      ))}
    </div>
  );
};

export default WeatherData;
