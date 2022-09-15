import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import * as api from "../api/PokemonAPI";
import GridView from "./GridViewComponent";
import ListView from "./ListViewComponent";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokedexViewSelector from "./PokedexViewSelectorComponent";
import { limitPerPage } from "../shared/utils";
import CustomPagination from "./CustomPaginationComponent";
import Pokemon, {pokemonDataInitialState} from "../shared/pokemon";

export default function PokedexView() {
  const [pokemonList, setPokemonList] = useState(pokemonDataInitialState);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setPokemonList(pokemonDataInitialState);
    api
      .getPokemonsList((page - 1) * limitPerPage)
      .then((data) => {
        setPagesCount(Math.ceil(data.count / limitPerPage));
        api
          .getPokemonDetailedList(data)
          .then((pokemons) => {
            return pokemons.map((pokemon) => new Pokemon(pokemon));
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
      <PokedexViewSelector view={view} setView={setView} />
      {pokemonList.dataLoaded ? (
        <>
          <CustomPagination
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            className="mt-3 mt-md-5"
          />
          {view === "grid" ? (
            <GridView pokemons={pokemonList.data} />
          ) : (
            <ListView pokemons={pokemonList.data} />
          )}
          <CustomPagination
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            className="mt-2 mb-4"
          />
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
