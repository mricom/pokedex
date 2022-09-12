import { HOST, limit } from "../shared/utils";

export const getPokemonsList = (offset) => {
  return fetch(`${HOST}pokemon/?limit=${limit}&offset=${offset}`);
};
