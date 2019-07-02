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

    // testSearch.addEventListener("change", () => {
    //   const testSearch = document.querySelector("[data-test-search]");
    //   const testBox = new window.google.maps.places.SearchBox(testSearch);
    //   const place = testBox.getPlaces()[0];
    //   if (place == null) return;
    //   const latitude = place.geometry.location.lat();
    //   const longitude = place.geometry.location.lng();

    //   console.log(latitude, longitude);
    // });

    // if (!window.google) {
    //   var s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = `https://maps.google.com/maps/api/js?key=YOUR_API_KEY`;
    //   var x = document.getElementsByTagName('script')[0];
    //   x.parentNode.insertBefore(s, x);
    //   // Below is important.
    //   //We cannot access google.maps until it's finished loading
    //   s.addEventListener('load', e => {
    //     this.onScriptLoad()
    //   })
    // } else {
    //   this.onScriptLoad()
    // }
  }

  /*** IMPORTANT!!! ***/
  /*** Autocomplete = https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Point&types=(cities)&language=pt_BR&key=AIzaSyDnn9EtoBOn8HOvNolU6ovjip0xpFhwqYA ***/
  /*** Find w/ placeID = https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ04KscAIxAIkR0ijk7xUzPbk&key=AIzaSyDnn9EtoBOn8HOvNolU6ovjip0xpFhwqYA ***/

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

    const getLocationId = new Promise((resolve, reject) => {
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

      getPredictions(options1, ({ description, id }) => {
        console.log(`This is the location info: ${description} ${id}`);
        results = { name: description, id: id };
        console.log(`Location Results:`, results);

        if (results) {
          return resolve(results);
        } else {
          let error = new Error("No results returned");
          return reject(error);
        }
      });
    });

    const getLocationOne = async () => {
      const result = await getLocationId;
      console.log(`This is the Result from the async/await:`, result);
      locationResults = { locationOne: { name: result.name, id: result.id } };
    };

    console.log(`LOCATION RESULTS:`, locationResults);

    //     getPredictions(options, ({ description, id }) => {
    //       console.log(`This is the location info: ${description} ${id}`);
    //       locationResults = { name: description, id: id };
    //       console.log(`Location Results:`, locationResults);
    //     });
    // };

    // const getCoords = (coordId, placeId) => {
    //   console.log("running get coords");
    //   try {
    //     const request = {
    //       fields: ["geometry.location"],
    //       placeId: `${placeId}`
    //     };

    //     const details = new window.google.maps.places.PlacesService(
    //       locationSearch[0]
    //     );

    //     details.getDetails(request, (results, status) => {
    //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //         console.log(results);
    //         const lat = results.geometry.location.lat();
    //         const lng = results.geometry.location.lng();
    //         console.log(lat, lng);
    //         this.setState((){
    //           [coordId]: lat
    //         });
    //       } else {
    //         throw new Error("Uh oh");
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

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
