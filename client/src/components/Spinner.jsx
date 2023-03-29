import React from "react";
import "../styles/spinner.css";

const Spinner = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center  h-screen">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      </div>
    </div>
  );
};

export default Spinner;
