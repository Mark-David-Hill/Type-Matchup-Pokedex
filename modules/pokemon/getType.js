const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async function(type) {
    let response = await P.getTypeByName(type)
    console.log('Type Info: ')
    console.log(response)
    console.log('End Type Info')
    return response;
}
