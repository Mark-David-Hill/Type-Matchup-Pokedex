const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

module.exports = async (pokemon) => {
  try {
    let response = await P.getPokemonByName(pokemon);
    return response;
  } catch (e) {
    console.error(e, "could not load data from pokemon api");
  }
};
