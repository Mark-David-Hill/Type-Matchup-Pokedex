const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = function(type) {
    P.getTypeByName(type).then(function(response) {
        console.log('Type Info: ')
        console.log(response)
        return response;
      })
}
