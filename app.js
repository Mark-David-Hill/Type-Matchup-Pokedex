// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

// with await, be sure to be in an async function (and in a try/catch)
// (async () => {
//     const golduck = await P.getPokemonByName("golduck")
//     console.log(golduck)
//   })()

let name = "charizard"

// name, types

// or with Promises
P.getPokemonByName(name)
  .then(function(response) {
    type1 = response.types[0].type.name
    type2 = response.types[1].type.name
  
    console.log(type1)
    console.log(type2)
  })