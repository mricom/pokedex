import React from "react";
import logo from "/src/img/logo.png";

export default function Logo() {
  return (
    <div className="main-logo d-flex justify-content-center align-items-center py-4">
      <img
        src={logo}
        className="img-fluid"
        alt="Pokemon logo"
      ></img>
    </div>
  );
}
