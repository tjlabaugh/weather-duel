import React from "react";
import Location from "./components/Location";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstInput: "",
      secondInput: "",
      post: ""
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
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      console.log(latitude, longitude);
    });

    searchBox2.addListener("places_changed", () => {
      const place = searchBox2.getPlaces()[0];
      if (place == null) return;
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      console.log(latitude, longitude);
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

    // const locationSearch = document.querySelectorAll("[data-location-search]");
    // const request = {
    //   query: "Point Pleasant, NJ",
    //   fields: ["name", "geometry"]
    // };

    // try {
    //   var service = new window.google.maps.places.PlacesService(
    //     locationSearch[0]
    //   );
    //   service.findPlaceFromQuery(request, result => {
    //     console.log(result);
    //     console.log(
    //       `Lat: ${result[0].geometry.location.lat()} Lng: ${result[0].geometry.location.lng()}`
    //     );
    //   });
    // } catch {
    //   console.log("Error :(");
    // }

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

      console.log(`LOCATION RESULTS:`, locationResults);

      this.setState({
        firstInput: locationResults.locationOne.name,
        secondInput: locationResults.locationTwo.name
      });
    };

    getLocationData();

    //getLocationId(options1);
    // getLocationId(options2);
    // getCoords("firstInputCoords", this.state.firstInputId);
    // getCoords("secondInputCoords", this.state.secondInputId);

    //console.log(locationResults);

    // try {
    //   const response = await fetch("/weather", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       firstInput: this.state.firstInput,
    //       secondInput: this.state.secondInput
    //     })
    //   });
    //   const body = await response.json();
    //   console.log(body);
    //   // const { temperature, summary, windGust } = body.currently;
    //   // this.setState({
    //   //   temp: temperature,
    //   //   summary: summary,
    //   //   windGust: windGust
    //   // });
    // } catch {
    //   console.log("There was an error");
    // }
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { temp, summary, windGust } = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        {/* <form onSubmit={this.googleTest}>
          <input
            type="text"
            data-location-search
            placeholder="Enter a City"
            name={"locationTest"}
            onChange={this.handleInputChange}
            onBlur={this.handleInputChange}
            value={this.state.locationTest}
          />
          <button type="submit">Submit</button>
        </form>
        <input type="text" data-test-search /> */}
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <Location
            handleInputChange={this.handleInputChange}
            locationId={"firstInput"}
            locationValue={this.state.firstInput}
          />
          <Location
            handleInputChange={this.handleInputChange}
            locationId={"secondInput"}
            locationValue={this.state.secondInput}
          />
          <button type="submit">Submit</button>
        </form>

        <p>
          {`Temperature: ${Math.round(
            temp
          )}, Wind Gust: ${windGust}, Summary: ${summary}`}
        </p>
      </div>
    );
  }
}

export default App;
