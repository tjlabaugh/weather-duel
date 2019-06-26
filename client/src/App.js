import React from "react";
import Location from "./components/Location";
import "./App.css";

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
        body: JSON.stringify({
          firstInput: this.state.firstInput,
          secondInput: this.state.secondInput
        })
      });
      const body = await response.json();
      console.log(body);
      // const { temperature, summary, windGust } = body.currently;
      // this.setState({
      //   temp: temperature,
      //   summary: summary,
      //   windGust: windGust
      // });
    } catch {
      console.log("There was an error");
    }
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
