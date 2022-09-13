import React, { useEffect, useState } from "react";
import * as api from "../api/PokemonAPI";
import GridView from "./GridViewComponent";

export default function ListView() {
  const [pokemonList, setPokemonList] = useState({
    dataLoaded: false,
    data: [],
  });
  const [view, setView] = useState("grid");

  useEffect(() => {
    api
      .getPokemonsList(0)
      .then((data) => {
        api
          .getPokemonDetailedList(data)
          .then((pokemons) => {
            return pokemons.map((pokemon) => ({
              name: pokemon.name,
              id: pokemon.id,
              detailUrl: pokemon.species.url,
              types: pokemon.types.map((item) => item.type.name),
              image: pokemon.sprites.other.home.front_default,
            }));
          })
          .then((list) => {
            setPokemonList((prevState) => ({
              ...prevState,
              dataLoaded: true,
              data: list,
            }));
          })
          .catch((e) => {
            alert(e);
            setPokemonList((prevState) => ({
              ...prevState,
              dataLoaded: true,
            }));
          });
      })
      .catch((e) => {
        alert(e);
        setPokemonList((prevState) => ({
          ...prevState,
          dataLoaded: true,
        }));
      });
  }, []);

  return (
    <div>
      {pokemonList.dataLoaded ? (
        <>
          {view === "grid" ? 
            <GridView pokemons={pokemonList.data}/>
            : 
            <>
            {pokemonList.data.map(pokemon => (
              <p>{pokemon.name}</p>
            ))}
            </>
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
