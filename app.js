// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();
const getPokemon = require('./modules/pokemon/getPokemon');
const getType = require('./modules/pokemon/getType');
const getTypes = require('./modules/pokemon/getTypes');
const util = require('./modules/util/util');
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;
const log = util.log;
const root = getEl('root');
const displayPokemon = require('./modules/pokemon/displayPokemon');

// Get Pokemon by name:
// P.getPokemonByName(pokemon).then(function(response) {
//    return response 
// });

// Get a Pokemon's type info:
// P.getTypeByName(type).then(function(response) {
  //  return response;
// });

// Get Pokemon Data
P.getPokemonByName('starmie').
  then((response) => {
    console.log(`${response.name}'s info retrieved.`)
    console.log(response)
    // Display Pokemon data
    getTypes(response);
    displayPokemon(response);
  })
  .catch((err) => console.log('Could not retrieve Pokemon data from Poke API.', err));


// // function getTypeData(type) {
// //   P.getTypeByName(type).then(function(response) {
// //     console.log('Type Info: ')
// //     console.log(response)
// //   })
// // }

// console.log('TRY TO GET TYPE:')
// getType('fire');