import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import * as api from "../api/PokemonAPI";
import GridView from "./GridViewComponent";
import ListView from "./ListViewComponent";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokedexViewSelector from "./PokedexViewSelectorComponent";
import { limitPerPage } from "../shared/utils";
import CustomPagination from "./CustomPaginationComponent";

export default function PokedexView() {
  const [pokemonList, setPokemonList] = useState({
    dataLoaded: false,
    data: [],
  });
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    api
      .getPokemonsList((page-1)*limitPerPage)
      .then((data) => {
        setPagesCount(Math.ceil(data.count / limitPerPage));
        api
          .getPokemonDetailedList(data)
          .then((pokemons) => {
            return pokemons.map((pokemon) => ({
              name: pokemon.name,
              id: pokemon.id,
              detailUrl: pokemon.species.url,
              types: pokemon.types.map((item) => item.type.name),
              image: pokemon.sprites.other["official-artwork"].front_default,
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
  }, [page]);

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
          <CustomPagination page={page} setPage={setPage} pagesCount={pagesCount}/>
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
