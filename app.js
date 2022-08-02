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

// P.getPokemonSpeciesList

const getPokeSprite = (name) => {
  P.getPokemonByName(name).
    then((response) => {
      const image = response.sprites.front_default
      console.log('image:')
      console.log(image);
    })
    // const image = pokemon.sprites.front_default
}

//
// Get array of all Pokemon (name and url)
// 
const interval = {
  offset: 0,
  limit: 905,
}
console.log('get pokemon list')
P.getPokemonsList(interval).then(function(response) {
  const allPokemon = response.results;
  console.log('all Pokemon:')
  console.log(allPokemon)
  const root = document.getElementById('root');
  let content = '';
  for (let i = 0; i < 151; i++) {
    const pokemon = allPokemon[i].name;
    P.getPokemonByName(pokemon).
    then((response) => {
      const image = response.sprites.front_default
      console.log('image:')
      console.log(image);
      content += `<image src="${image}">`
    })
  }
  setTimeout(() => {
    root.innerHTML = content;
  }, 2000)
  
})





// console.log('Pokedex:')
// console.log(P)




// // function getTypeData(type) {
// //   P.getTypeByName(type).then(function(response) {
// //     console.log('Type Info: ')
// //     console.log(response)
// //   })
// // }

// console.log('TRY TO GET TYPE:')
// getType('fire');



// // Get Pokemon Data
// P.getPokemonByName('pikachu').
//   then((response) => {
//     console.log(`${response.name}'s info retrieved.`)
//     console.log(response)
//     // Display Pokemon data
//     getTypes(response);
//     displayPokemon(response);
//   })
//   .catch((err) => console.log('Could not retrieve Pokemon data from Poke API.', err));