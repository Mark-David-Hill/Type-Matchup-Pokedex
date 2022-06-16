// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const getPokemon = require('./getPokemon');
const printHello = require('./print-hello');
printHello();
let newPokemon = getPokemon('charizard');
// console.log(newPokemon);


// with await, be sure to be in an async function (and in a try/catch)
// (async () => {
//     const golduck = await P.getPokemonByName("golduck")
//     console.log(golduck)
//   })()


// name, types

// or with Promises

function getTypes(pokemon) {
  // Retrieve Pokemon data from api by name
  P.getPokemonByName(pokemon)
  .then(function(response) {
    let typesData = response.types;
    let types = [];
    typesData.forEach(element => {
      let currentType = element.type.name;
      types.push(currentType)
    });

    console.log(types);
    return types;
  })
}

getTypes("bulbasaur");
