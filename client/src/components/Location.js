import React from "react";

const Location = ({
  handleSubmit,
  handleInputChange,
  locationId,
  locationValue
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to server:</strong>
        </p>
        <input
          type="text"
          name={locationId}
          value={locationValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Location;
