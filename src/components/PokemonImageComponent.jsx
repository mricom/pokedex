import React from "react";

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
          src={"/src/img/questionmark.png"}
          alt={props.name + " image"}
          className="img-fluid questionmark"
        ></img>
      )}
    </>
  );
}
