import React from "react";
import { Badge } from "reactstrap";
import "../css/Card.css";

export default function Card(props) {
  return (
    <div className="custom-card">
      <div className="custom-card-header">
        <img
          src={props.pokemon.image}
          alt={props.pokemon.name + " image"}
          className="img-fluid"
        ></img>
      </div>
      <div className="custom-card-body">
        <p className="pokemon-number">Nº {props.pokemon.id}</p>
        <h5 className="pokemon-name">{props.pokemon.name}</h5>
        <div className="pokemon-types">
          {props.pokemon.types.map((type) => (
            <Badge className={type}>{type}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
