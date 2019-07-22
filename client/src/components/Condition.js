import React from "react";
import { formatData, getWinner } from "../js/format";

const Condition = ({
  conditionName,
  conditionKey,
  locationOneConditionData,
  locationTwoConditionData
}) => {
  const winner = getWinner(
    conditionKey,
    locationOneConditionData,
    locationTwoConditionData
  );

  return (
    <div className="condition">
      <div className="condition-name">{conditionName}</div>
      <div
        className={`condition-data ${(winner === 1 || winner === 0) &&
          "winner"}`}
      >
        <span>{formatData(locationOneConditionData, conditionKey)}</span>
      </div>
      <div
        className={`condition-data ${(winner === 2 || winner === 0) &&
          "winner"}`}
      >
        <span>{formatData(locationTwoConditionData, conditionKey)}</span>
      </div>
    </div>
  );
};

export default Condition;
