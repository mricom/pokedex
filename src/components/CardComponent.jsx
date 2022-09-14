import React from "react";
import CustomBadge from "./CustomBadgeComponent";
import PokemonImage from "./PokemonImageComponent";
import "../css/Card.css";

export default function Card(props) {
  return (
    <div className="custom-card">
      <div className="custom-card-header">
        <PokemonImage image={props.pokemon.image} name={props.pokemon.name} />
      </div>
      <div className="custom-card-body">
        <p className="pokemon-number">Nº {props.pokemon.id}</p>
        <h5 className="pokemon-name">{props.pokemon.name}</h5>
        <div className="pokemon-types">
          {props.pokemon.types.map((type) => (
            <CustomBadge type={type} key={type} />
          ))}
        </div>
      </div>
    </div>
  );
}
