/* eslint-disable */
import React from "react";

export default function Info({clickValue}) {
  return (
    <div className={"info"}>
      <div className={"info__try"}>
        <p className={"info__try-value"}>{`Количество перестановок ${clickValue}`}</p>
      </div>
    </div>
  );
};

