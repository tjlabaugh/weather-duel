import React from "react";
import Condition from "./Condition";

const WeatherData = ({
  locationOneData,
  locationTwoData,
  locationOneName,
  locationTwoName
}) => {
  let dataOne;
  // dataOne.currently = { temperature: "-", windGust: "-", summary: "-" };
  let dataTwo;
  // dataTwo.currently = { temperature: "-", windGust: "-", summary: "-" };
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
  if (locationOneData !== "") {
    dataOne = JSON.parse(locationOneData);
  }
  if (locationTwoData !== "") {
    dataTwo = JSON.parse(locationTwoData);
  }

  console.log(dataOne);
  return (
    <div className="weather-data-display">
      <div className="locations">
        <div className="location">
          <span>{locationOneName}</span>
        </div>
        <div className="location">
          <span>{locationTwoName}</span>
        </div>
      </div>
      {Object.keys(weatherConditions).map((key, index) => (
        <Condition
          locationOneConditionData={dataOne ? dataOne.currently[key] : "-"}
          locationTwoConditionData={dataTwo ? dataTwo.currently[key] : "-"}
          conditionName={weatherConditions[key]}
          key={weatherConditions[key]}
        />
      ))}
    </div>
    // <div className="container">
    //   <div>
    //   Location:{locationValue}</div>

    //   <div>
    //     <div className="cat">Temperature</div>
    //     <div className="value">{Math.round(data.currently.temperature)}</div>
    //   </div>
    //   <div>
    //     <div className="cat">Wind Gust</div>
    //     <div className="value">{data.currently.windGust}</div>
    //   </div>
    //   <div>
    //     <div className="cat">Summary</div>
    //     <div className="value">{data.currently.summary}</div>
    //   </div>
    // </div>
  );
};

export default WeatherData;
