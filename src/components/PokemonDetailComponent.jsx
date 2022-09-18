import React from "react";
import { Col, Row } from "reactstrap";
import PokemonImage from "./PokemonImageComponent";
import CustomBadge from "./CustomBadgeComponent";
import "../css/PokemonDetail.css";

export default function PokemonDetail({ pokemon }) {
  return (
    <>
      <Row>
        <Col className="pokemon-name text-center">
          <h1>{pokemon.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6" className="pokemon-image-col" key="pokemon-image">
          <div className="pokemon-image-div">
            <PokemonImage image={pokemon.image} name={pokemon.name} />
          </div>
        </Col>
        <Col xs="12" md="6" key="pokemon-data" className="pokemon-data">
          <div className="pokemon-features">
            <div>
              <span>Height: </span>
              {pokemon.height}m
            </div>
            <div>
              <span>Weight: </span>
              {pokemon.weight}kg
            </div>
          </div>
          <div className="pokemon-types mt-4">
            <h5>{pokemon.types.length > 1 ? "Types:" : "Type:"}</h5>
            {pokemon.types.map((type) => (
              <CustomBadge type={type} key={type} />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}
