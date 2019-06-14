import React, { Component } from "react";
import spinner from "./spinner.gif";
const Spinner = props => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "180px", margin: " 40px auto", display: "block" }}
    />
  );
};

export default Spinner;
