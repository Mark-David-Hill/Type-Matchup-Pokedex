const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = function(pokemon) {
    P.getPokemonByName(pokemon)
  .then(function(response) {
    console.log('in module')
    console.log(response)
    return response;
  })
}