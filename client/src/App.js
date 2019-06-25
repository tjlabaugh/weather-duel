import React from "react";
import Location from "./components/Location";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: ""
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ post: this.state.post })
      });
      const body = await response.json();
      console.log(body.currently);
      const { temperature, summary, windGust } = body.currently;
      this.setState({
        firstInput: "",
        secondInput: "",
        temp: temperature,
        summary: summary,
        windGust: windGust
      });
    } catch {
      console.log("There was an error");
    }
  };

  // handleInputChange = (value, locationId) => {
  //   this.setState({
  //     locationId: value
  //   });
  // };

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
        <Location
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          locationId={"firstInput"}
          locationValue={this.state.firstInput}
        />
        <Location
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          locationId={"secondInput"}
          locationValue={this.state.secondInput}
        />
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
