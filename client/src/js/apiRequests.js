// Gets Location ID and City/State
const getLocationId = options => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.AutocompleteService();
    let results;

    const getPredictions = (options, returnLocationInfo) => {
      service.getPlacePredictions(options, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          returnLocationInfo({
            description: predictions[0].description,
            id: predictions[0].place_id
          });
        }
      });
    };

    getPredictions(options, ({ description, id }) => {
      results = { name: description, id: id };

      if (results) {
        resolve(results);
      } else {
        let error = new Error("No results returned");
        reject(error);
      }
    });
  });
};

// Gets latidude and longitude
const getCoords = placeId => {
  return new Promise((resolve, reject) => {
    const locationSearch = document.querySelectorAll("[data-location-search]");
    const request = {
      fields: ["geometry.location"],
      placeId: `${placeId}`
    };
    let results;

    const details = new window.google.maps.places.PlacesService(
      locationSearch[0]
    );

    const getCoordData = (request, returnCoordData) => {
      details.getDetails(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const lat = results.geometry.location.lat();
          const lng = results.geometry.location.lng();
          returnCoordData({
            lat,
            lng
          });
        }
      });
    };

    getCoordData(request, ({ lat, lng }) => {
      results = { latitude: lat, longitude: lng };

      if (results) {
        resolve(results);
      } else {
        let error = new Error("No results returned");
        reject(error);
      }
    });
  });
};

const getLocationData = async () => {
  const locationSearch = document.querySelectorAll("[data-location-search]");
  const options1 = {
    input: locationSearch[0].value,
    types: ["(cities)"],
    inputName: locationSearch[0].name
  };
  const options2 = {
    input: locationSearch[1].value,
    types: ["(cities)"],
    inputName: locationSearch[1].name
  };
  let locationResults;

  const locationDetailsOne = await getLocationId(options1);
  const locationDetailsTwo = await getLocationId(options2);
  const coordsOne = await getCoords(locationDetailsOne.id);
  const coordsTwo = await getCoords(locationDetailsTwo.id);

  locationResults = {
    locationOne: {
      name: locationDetailsOne.name,
      id: locationDetailsOne.id,
      latitude: coordsOne.latitude,
      longitude: coordsOne.longitude
    },
    locationTwo: {
      name: locationDetailsTwo.name,
      id: locationDetailsTwo.id,
      latitude: coordsTwo.latitude,
      longitude: coordsTwo.longitude
    }
  };

  this.setState({
    firstInput: locationResults.locationOne.name,
    secondInput: locationResults.locationTwo.name,
    locationOneName: locationResults.locationOne.name,
    locationTwoName: locationResults.locationTwo.name
  });

  return locationResults;
};

const getWeatherData = async () => {
  const locationData = await getLocationData();

  const response = await fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      locationOne: {
        latitude: locationData.locationOne.latitude,
        longitude: locationData.locationOne.longitude
      },
      locationTwo: {
        latitude: locationData.locationTwo.latitude,
        longitude: locationData.locationTwo.longitude
      }
    })
  });
  const body = await response.json();

  const weatherData = [
    {
      currently: body.locationOne.currently,
      daily: body.locationOne.daily.data[0]
    },
    {
      currently: body.locationTwo.currently,
      daily: body.locationTwo.daily.data[0]
    }
  ];
  const locations = { locationOne: {}, locationTwo: {} };

  console.log(locations);

  Object.keys(locations).map(
    (key, index) => (locations[key] = weatherData[index])
  );

  this.setState({
    locationOne: JSON.stringify(locations.locationOne),
    locationTwo: JSON.stringify(locations.locationTwo),
    loading: false
  });

  this.setState({
    loading: true
  });
};

export default getWeatherData;
