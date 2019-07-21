import React from "react";
import formatData from "../js/format";

const Condition = ({
  conditionName,
  conditionKey,
  locationOneConditionData,
  locationTwoConditionData
}) => {
  return (
    <div className="condition">
      <div className="condition-name">{conditionName}</div>
      <div className="condition-data">
        <span>{formatData(locationOneConditionData, conditionKey)}</span>
      </div>
      <div className="condition-data">
        <span>{formatData(locationTwoConditionData, conditionKey)}</span>
      </div>
    </div>
  );
};

export default Condition;
