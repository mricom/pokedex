import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import CustomBadge from "./CustomBadgeComponent";
import "../css/ListView.css";

export default function ListView(props) {
  return (
    <ListGroup flush className="list-view">
      {props.pokemons.map((pokemon) => (
        <ListGroupItem>
          <Row className="align-items-center">
            <Col xs="1" className="pokemon-image">
              <img
                src={pokemon.image}
                alt={pokemon.name + " image"}
                className="img-fluid"
              />
            </Col>
            <Col xs="2" className="text-center">
              <div className="pokemon-number">Nº {pokemon.id}</div>
            </Col>
            <Col xs="9">
              <h5 className="pokemon-name">{pokemon.name}</h5>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <CustomBadge type={type} />
                ))}
              </div>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
