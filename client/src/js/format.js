function formatData(data, condition) {
  let output;
  console.log(`FORMAT`, data, condition);

  switch (condition) {
    case "temperature":
    case "apparentTemperature":
    case "temperatureHigh":
    case "temperatureLow":
    case "apparentTemperatureHigh":
    case "apparentTemperatureLow":
      output = data !== "-" ? `${Math.round(data)}°` : data;
      return output;
    case "humidity":
    case "precipProbability":
    case "cloudCover":
      output = data !== "-" ? `${data * 100}%` : data;
      return output;
    case "windGust":
      output = output = data !== "-" ? `${Math.round(data)} MPH` : data;
      return output;
    default:
      return data;
  }
}

export default formatData;
