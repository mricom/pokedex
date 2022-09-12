import { HOST, limit } from "../shared/utils";

export const getPokemonsList = (offset) => {
  return fetch(`${HOST}pokemon/?limit=${limit}&offset=${offset}`).then(
    (response) => {
      if (response.status !== 200) {
        throw new Error("Invalid Status from server: " + response.statusText);
      }
      return response.json();
    }
  );
};

export const getPokemonDetail = (url) => {
  return fetch(url);
};

export const getPokemonDetailedList = (data) => {
  return Promise.all(
    data.results.map((pokemon) => {
      return getPokemonDetail(pokemon.url);
    })
  )
    .then((responses) => {
      responses.forEach((response) => {
        if (response.status !== 200) {
          throw new Error(
            "Invalid Status from server catching " +
              pokemon.name +
              " details: " +
              response.statusText
          );
        }
      });
      return responses;
    })
    .then((responses) => {
      return Promise.all(responses.map((response) => response.json()));
    });
};
