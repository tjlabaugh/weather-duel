import React from "react";
import Location from "./Location";

const LocationSearch = props => {
  return (
    <form className="location-search" onSubmit={props.handleSubmit}>
      <div className="location-search__inputs">
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
      </div>
      <button className="location-search__submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LocationSearch;
