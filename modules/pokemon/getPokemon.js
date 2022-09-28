const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async (pokemon) => {
    // Retrieve Pokemon data from api by name, then executes the next specified function.
    try {
        let response = await P.getPokemonByName(pokemon);
        // let species = await P.getPokemonSpeciesByName(pokemon);
        return response;
    }
    catch (err) {
        console.log('Failed to load data from Pokemon API. ERROR:', err);
    }
}