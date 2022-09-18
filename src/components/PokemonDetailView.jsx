import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailErrorControl } from "../api/PokemonAPI";
import { PokemonExtended, pokemonDataInitialState } from "../shared/pokemon";
import { Row, Col, Alert } from "reactstrap";
import LoadingSpinner from "./LoadingSpinnerComponent";
import PokemonDetail from "./PokemonDetailComponent";
import BackButton from "./BackButtonComponent";

export default function PokemonDetailView() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState(pokemonDataInitialState);

  useEffect(() => {
    getPokemonDetailErrorControl({ id })
      .then((pokemon) => {
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: {
            isLoaded: true,
            isValid: true,
            error: "",
          },
          data: new PokemonExtended(pokemon),
        }));
      })
      .catch((e) => {
        setPokemon((prevState) => ({
          ...prevState,
          dataLoaded: {
            isLoaded: true,
            isValid: false,
            error: e.toString(),
          },
          data: {},
        }));
      });
  }, []);

  return (
    <>
      {pokemon.dataLoaded.isLoaded ? (
        <>
          <div className="pokemon-detail-view">
            <Row>
              <Col>
                <BackButton backTo="/pokemons/" />
              </Col>
            </Row>
            {pokemon.dataLoaded.isValid ? (
              <PokemonDetail pokemon={pokemon.data} />
            ) : (
              <Row className="align-items-center pt-4 ">
                <Col className="text-center">
                  <Alert color="danger" className="text-center">
                    {pokemon.dataLoaded.error}
                  </Alert>
                </Col>
              </Row>
            )}
          </div>
        </>
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
