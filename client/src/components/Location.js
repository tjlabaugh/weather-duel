import React from "react";

const Location = ({ handleInputChange, locationId, locationValue }) => {
  return (
    <div className="location-search__inputs__input">
      <input
        type="text"
        name={locationId}
        value={locationValue}
        onChange={handleInputChange}
        data-location-search
        placeholder="Enter a city"
        required
      />
    </div>
  );
};

export default Location;
