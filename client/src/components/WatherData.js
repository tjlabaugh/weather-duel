import React from "react";
import Condition from "./Condition";

class WeatherData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const skycons = new window.Skycons({ color: "#fff" });
    let iconDataOne;
    let iconDataTwo;

    if (this.props.locationOneData !== "") {
      let body = JSON.parse(this.props.locationOneData);
      iconDataOne = body.currently.icon;
    }
    if (this.props.locationTwoData !== "") {
      let body = JSON.parse(this.props.locationTwoData);
      iconDataTwo = body.currently.icon;
    }
    skycons.set("icon1", iconDataOne ? iconDataOne : "-");
    skycons.set("icon2", iconDataTwo ? iconDataTwo : "-");
    skycons.play();
  }

  render() {
    const {
      locationOneData,
      locationTwoData,
      locationOneName,
      locationTwoName
    } = this.props;

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
        <div className="weather-icons">
          <div className="category">
            <span>Current Conditions</span>
          </div>
          <div>
            <canvas id="icon1" />
          </div>
          <div>
            <canvas id="icon2" />
          </div>
        </div>
        {Object.keys(weatherConditions.currently).map((key, index) => (
          <Condition
            locationOneConditionData={dataOne ? dataOne.currently[key] : "-"}
            locationTwoConditionData={dataTwo ? dataTwo.currently[key] : "-"}
            conditionName={weatherConditions.currently[key]}
            conditionKey={key}
            key={`current-${key}`}
          />
        ))}
        <div className="category">
          <span>Daily Conditions</span>
        </div>
        {Object.keys(weatherConditions.daily).map((key, index) => (
          <Condition
            locationOneConditionData={dataOne ? dataOne.daily[key] : "-"}
            locationTwoConditionData={dataTwo ? dataTwo.daily[key] : "-"}
            conditionName={weatherConditions.daily[key]}
            conditionKey={key}
            key={`daily-${key}`}
          />
        ))}
      </div>
    );
  }
}

export default WeatherData;
