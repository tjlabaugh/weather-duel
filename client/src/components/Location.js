import React from "react";

const Location = ({ handleInputChange, locationId, locationValue }) => {
  return (
    <div>
      <input
        type="text"
        name={locationId}
        value={locationValue}
        onChange={handleInputChange}
        data-location-search
        placeholder="Enter a city"
      />
    </div>
  );
};

export default Location;
