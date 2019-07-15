import React from "react";

const Condition = ({
  conditionName,
  locationOneConditionData,
  locationTwoConditionData
}) => {
  return (
    <div className="condition">
      <div className="condition-name">{conditionName}</div>
      <div className="condition-data">
        <span>{locationOneConditionData}</span>
      </div>
      <div className="condition-data">
        <span>{locationTwoConditionData}</span>
      </div>
    </div>
  );
};

export default Condition;
