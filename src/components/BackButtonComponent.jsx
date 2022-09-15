import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/BackButton.css";

export default function BackButton(props) {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate(props.backTo);
  };

  return (
    <div className="back-button">
      <i className="fa-solid fa-circle-arrow-left" onClick={changeRoute}></i>
    </div>
  );
}
