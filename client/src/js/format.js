export function formatData(data, condition) {
  let output;

  switch (condition) {
    case "temperature":
    case "apparentTemperature":
    case "temperatureHigh":
    case "temperatureLow":
    case "apparentTemperatureHigh":
    case "apparentTemperatureLow":
      output = data !== "-" ? `${Math.round(data).toFixed(0)}°` : data;
      return output;
    case "humidity":
    case "precipProbability":
    case "cloudCover":
      output = data !== "-" ? `${(data * 100).toFixed(0)}%` : data;
      return output;
    case "windGust":
      output = output =
        data !== "-" ? `${Math.round(data).toFixed(0)} MPH` : data;
      return output;
    default:
      return data;
  }
}

export function getWinner(condition, dataOne, dataTwo) {
  switch (condition) {
    case "temperature":
    case "apparentTemperature":
    case "temperatureHigh":
    case "temperatureLow":
    case "apparentTemperatureHigh":
    case "apparentTemperatureLow":
      if (Math.abs(dataOne - 70) === Math.abs(dataTwo - 70)) {
        return 0;
      } else if (Math.abs(dataOne - 70) < Math.abs(dataTwo - 70)) {
        return 1;
      } else {
        return 2;
      }
    case "humidity":
    case "precipProbability":
    case "cloudCover":
    case "windGust":
    case "uvIndex":
      if (Math.abs(dataOne) === Math.abs(dataTwo)) {
        return 0;
      } else if (Math.abs(dataOne) < Math.abs(dataTwo)) {
        return 1;
      } else {
        return 2;
      }
    default:
      return "";
  }
}

export default { formatData, getWinner };
