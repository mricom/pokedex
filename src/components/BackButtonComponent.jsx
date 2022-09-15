import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function BackButton(props) {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate(props.backTo);
  };

  return (
    <Button className="back-button" onClick={changeRoute}>
      <i className="fa-solid fa-circle-arrow-left"></i>
    </Button>
  );
}
