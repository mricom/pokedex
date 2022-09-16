import React from "react";
import questionmark from "/src/img/questionmark.png";

export default function PokemonImage(props) {
  return (
    <>
      {props.image ? (
        <img
          src={props.image}
          alt={props.name + " image"}
          className="img-fluid"
        ></img>
      ) : (
        <img
          src={questionmark}
          alt={props.name + " image"}
          className="img-fluid questionmark"
        ></img>
      )}
    </>
  );
}
