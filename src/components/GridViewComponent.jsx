import React from "react";
import { Row, Col } from "reactstrap";
import Card from "./CardComponent";
import { Link } from "react-router-dom";
import "../css/GridView.css";

export default function GridView(props) {
  return (
    <Row className="grid-view">
      {props.pokemons.map((pokemon) => (
        <Col xs="6" md="4" lg="3" key={pokemon.id}>
          <Link to={`/pokemons/${pokemon.id}`}>
            <Card pokemon={pokemon}></Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
