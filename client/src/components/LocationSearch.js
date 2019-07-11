import React from "react";
import Location from "./Location";

const LocationSearch = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Location
        handleInputChange={props.handleInputChange}
        locationId={"firstInput"}
        locationValue={props.locationValues.firstInput}
      />
      <Location
        handleInputChange={props.handleInputChange}
        locationId={"secondInput"}
        locationValue={props.locationValues.secondInput}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationSearch;
