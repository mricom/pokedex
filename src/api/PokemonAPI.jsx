import { HOST, limitPerPage } from "../shared/utils";

export const getPokemonsList = (offset) => {
  return fetch(`${HOST}pokemon/?limit=${limitPerPage}&offset=${offset}`).then(
    (response) => {
      if (response.status !== 200) {
        throw new Error("Invalid Status from server. " + response.statusText);
      }
      return response.json();
    }
  );
};

export const getPokemonDetail = ({ url = null, id = null }) => {
  const finalUrl = url ? url : `${HOST}pokemon/${id}`;
  return fetch(finalUrl);
};

export const getPokemonDetailErrorControl = ({ url, id }) => {
  return getPokemonDetail({ url, id }).then((response) => {
    console.log(response);
    if (response.status === 404) {
      throw new Error("Invalid Status from server: Not found.");
    } else if(response.status !== 200){
      throw new Error("Invalid Status from server. " + response.statusText);
    } 
    return response.json();
  });
};

export const getPokemonDetailedList = (data) => {
  return Promise.all(
    data.results.map((pokemon) => {
      return getPokemonDetail({ url: pokemon.url });
    })
  )
    .then((responses) => {
      responses.forEach((response) => {
        if (response.status !== 200) {
          throw new Error(
            "Invalid Status from server catching " +
              pokemon.name +
              " details. " +
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
