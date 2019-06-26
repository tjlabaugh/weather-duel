import React from "react";

const Location = ({ handleInputChange, locationId, locationValue }) => {
  return (
    <div>
      <input
        type="text"
        name={locationId}
        value={locationValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Location;
