const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

module.exports = async () => {
  const interval = {
    offset: 0,
    limit: 1025,
  };

  // Retrieve list of all Pokemon given specified interval. Includes name and url
  try {
    let response = await P.getPokemonsList(interval);
    // toDo(response);
    return response.results;
  } catch (e) {
    console.error(e, "failed to load data from Pokemon API.");
  }
};
