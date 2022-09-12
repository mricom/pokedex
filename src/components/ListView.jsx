import React, { useEffect, useState } from "react";
import * as api from "../api/Pokemon";
import { HOST, limit } from "../shared/utils";

export default function ListView() {
  const [pokemonList, setPokemonList] = useState({
    dataLoaded: false,
    data: [],
  });

  useEffect(() => {
    api.getPokemonsList(0)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Invalid Status from server: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList((prevState) => ({
          ...prevState,
          dataLoaded: true,
          data: data.results,
        }));
      })
      .catch((e) => {
        alert(e);
        setPokemonList((prevState) => ({
          ...prevState,
          dataLoaded: true,
        }));
      });
  }, []);

  return <></>;
}
