import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import * as api from "../api/PokemonAPI";
import GridView from "./GridViewComponent";
import ListView from "./ListViewComponent";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokedexViewSelector from "./PokedexViewSelectorComponent";

export default function PokedexView() {
  const [pokemonList, setPokemonList] = useState({
    dataLoaded: false,
    data: [],
  });
  const [view, setView] = useState("list");

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
              image: pokemon.sprites.other["official-artwork"].front_default,
              //image: pokemon.sprites.other.home.front_default,
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
          <PokedexViewSelector view={view} setView={setView} />
          {view === "grid" ? (
            <GridView pokemons={pokemonList.data} />
          ) : (
            <ListView pokemons={pokemonList.data} />
          )}
        </>
      ) : (
        <Row className="align-items-center py-4">
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      )}
    </div>
  );
}
