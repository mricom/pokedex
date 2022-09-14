import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import CustomBadge from "./CustomBadgeComponent";
import PokemonImage from "./PokemonImageComponent";
import "../css/ListView.css";

export default function ListView(props) {
  return (
    <ListGroup flush className="list-view">
      {props.pokemons.map((pokemon) => (
        <ListGroupItem key={pokemon.id}>
          <Row className="align-items-center">
            <Col xs="1" className="pokemon-image text-center">
              <PokemonImage image={pokemon.image} name={pokemon.name}/>
            </Col>
            <Col xs="2" className="text-center">
              <div className="pokemon-number">Nº {pokemon.id}</div>
            </Col>
            <Col xs="9">
              <h5 className="pokemon-name">{pokemon.name}</h5>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <CustomBadge type={type} key={type}/>
                ))}
              </div>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
