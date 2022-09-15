import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailErrorControl } from "../api/PokemonAPI";
import Pokemon, { pokemonDataInitialState } from "../shared/pokemon";

export default function PokemonDetailView() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState(pokemonDataInitialState);

  useEffect(() => {
    getPokemonDetailErrorControl({ id })
      .then((pokemon) => {
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: true,
          data: new Pokemon(pokemon),
        }));
      })
      .catch((e) => {
        alert(e);
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: true,
        }));
      });
  });

  return (
    <div className="pokemon-detail-view">
      <p>{pokemon.data.name}</p>
      <div><img src={pokemon.data.image} alt={pokemon.data.name + " image"}/></div>
    </div>
  );
}
