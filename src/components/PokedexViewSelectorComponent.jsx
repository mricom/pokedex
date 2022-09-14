import React from "react";
import { Col, Row } from "reactstrap";
import "../css/PokedexViewSelector.css";

export default function PokedexViewSelector(props) {
  return (
    <Row className="mt-2 mt-lg-5 mb-4 pokedex-view-selector">
      <Col className="text-center">
        <span
          className={props.view === "grid" ? "active" : ""}
          onClick={() => props.setView("grid")}
        >
          Grid
        </span>
        <span
          className={props.view === "list" ? "active" : ""}
          onClick={() => props.setView("list")}
        >
          List
        </span>
      </Col>
    </Row>
  );
}
