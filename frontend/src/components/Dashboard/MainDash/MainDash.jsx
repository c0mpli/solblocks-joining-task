import React from "react";
import Cards from "../Cards/Cards";
import Programs from "../Programs/Programs";
import "./MainDash.css";

const MainDash = (props) => {
  return (
    <>
      <div className="MainDash">
        <h2>General Stats</h2>
        <Cards />
        <div className="maindash-heading-wrapper">
          <h2>Your Addresses</h2>
          <button
            className="standard-button"
            onClick={() => props.setModal(true)}
          >
            Add address
          </button>
        </div>
        <Programs />
      </div>
    </>
  );
};

export default MainDash;
