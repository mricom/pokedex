import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import * as api from "../api/PokemonAPI";
import GridView from "./GridViewComponent";
import ListView from "./ListViewComponent";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokedexViewSelector from "./PokedexViewSelectorComponent";
import { limitPerPage } from "../shared/utils";
import CustomPagination from "./CustomPaginationComponent";
import { Pokemon, pokemonDataInitialState } from "../shared/pokemon";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../shared/useQuery";

export default function PokedexView() {
  let query = useQuery();
  const queryPage = isNaN(query.get("page"))
    ? 1
    : JSON.parse(query.get("page"));
  const queryView = query.get("view");
  const page = queryPage || JSON.parse(sessionStorage.getItem("page")) || 1;
  const view = queryView || sessionStorage.getItem("view") || "grid";
  const [pokemonList, setPokemonList] = useState(pokemonDataInitialState);
  const [pagesCount, setPagesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!queryPage || !queryView) {
      navigate(`/pokemons/?page=${page}&view=${view}`, { replace: true });
    }
    if (!["grid", "list"].includes(view)) {
      navigate(
        `/pokemons/?page=${page}&view=${
          sessionStorage.getItem("view") || "grid"
        }`,
        { replace: true }
      );
    }
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

  const handlePageChange = (e, value) => {
    navigate(`/pokemons/?page=${value}&view=${view}`);
    sessionStorage.setItem("page", value);
  };

  const setView = (value) => {
    navigate(`/pokemons/?page=${page}&view=${value}`);
    sessionStorage.setItem("view", value);
  };

  return (
    <div>
      <PokedexViewSelector view={view} setView={setView} />
      {pokemonList.dataLoaded ? (
        <>
          <CustomPagination
            page={page}
            handlePageChange={handlePageChange}
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
            handlePageChange={handlePageChange}
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
