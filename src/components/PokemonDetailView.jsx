import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailErrorControl } from "../api/PokemonAPI";
import { PokemonExtended, pokemonDataInitialState } from "../shared/pokemon";
import { Row, Col } from "reactstrap";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokemonDetail from "./PokemonDetailComponent";

export default function PokemonDetailView() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState(pokemonDataInitialState);

  useEffect(() => {
    getPokemonDetailErrorControl({ id })
      .then((pokemon) => {
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: true,
          data: new PokemonExtended(pokemon),
        }));
      })
      .catch((e) => {
        alert(e);
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: true,
        }));
      });
  }, []);

  return (
    <>
      {pokemon.dataLoaded ? (
        <PokemonDetail pokemon={pokemon.data} />
      ) : (
        <Row className="align-items-center py-4">
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      )}
    </>
  );
}
