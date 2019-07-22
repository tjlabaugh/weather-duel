import React from "react";
import "./App.scss";
import WeatherData from "./components/WeatherData";
import LocationSearch from "./components/LocationSearch";
import Footer from "./components/Footer";

import sunLoad from "./images/sun-solid.svg";
import bolt from "./images/bolt-solid.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstInput: "",
      secondInput: "",
      post: "",
      locationOne: "",
      locationTwo: "",
      loading: false,
      showWinners: false
    };
  }

  componentDidMount() {
    const locationSearch = document.querySelectorAll("[data-location-search]");
    const searchBox1 = new window.google.maps.places.SearchBox(
      locationSearch[0]
    );
    const searchBox2 = new window.google.maps.places.SearchBox(
      locationSearch[1]
    );

    searchBox1.addListener("places_changed", () => {
      const place = searchBox1.getPlaces()[0];
      if (place == null) return;
    });

    searchBox2.addListener("places_changed", () => {
      const place = searchBox2.getPlaces()[0];
      if (place == null) return;
    });
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();

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
        const locationSearch = document.querySelectorAll(
          "[data-location-search]"
        );
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
      const locationSearch = document.querySelectorAll(
        "[data-location-search]"
      );
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
    };

    getWeatherData();

    this.setState({
      loading: true
    });
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  toggleWinners = () => {
    this.setState((state, props) => ({
      showWinners: !state.showWinners
    }));
  };

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="header__content">
            <h1>
              Weather{""}
              <div className="logo-container">
                <img className="logo" src={bolt} alt="Lightning Bolt" />
              </div>
              {""}
              Duel
            </h1>
          </div>
        </header>
        <div className="container">
          <LocationSearch
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            locationValues={{
              firstInput: this.state.firstInput,
              secondInput: this.state.secondInput
            }}
          />
          {this.state.loading ? (
            <div className="loading">
              <img className="loading__icon" src={sunLoad} alt="Loading" />
              <p>Weather data is loading...</p>
            </div>
          ) : (
            <WeatherData
              loading={this.state.loading}
              locationOneData={this.state.locationOne}
              locationTwoData={this.state.locationTwo}
              locationOneName={this.state.locationOneName}
              locationTwoName={this.state.locationTwoName}
              toggleWinners={this.toggleWinners}
              showWinners={this.state.showWinners}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
