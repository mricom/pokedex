import React from "react";
import { Row, Col } from "reactstrap";
import Card from "./CardComponent";
import "../css/GridView.css";

export default function GridView(props) {
  return (
    <Row className="grid-view">
      {props.pokemons.map((pokemon) => (
        <Col xs="6" md="4" lg="3" key={pokemon.id}>
          <Card pokemon={pokemon}></Card>
        </Col>
      ))}
    </Row>
  );
}
