export default class Pokemon {
  constructor(pokemon){
    this.name = pokemon.name;
    this.id = pokemon.id;
    this.detailUrl = pokemon.species.url;
    this.types = pokemon.types.map((item) => item.type.name);
    this.image = pokemon.sprites.other["official-artwork"].front_default;
  }
}

export const pokemonDataInitialState = {
  dataLoaded: false,
  data: [],
};
