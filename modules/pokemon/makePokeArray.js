const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

module.exports = (pokeList) => {
  allPokemon = pokeList.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
    url: pokemon.url,
  }));

  return allPokemon;
};
