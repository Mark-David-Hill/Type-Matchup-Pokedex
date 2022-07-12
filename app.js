// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const getType = require('./modules/pokemon/getType');
const util = require('./modules/util/util');
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;
const log = util.log;
const root = getEl('root');

// Get Pokemon by name:
// P.getPokemonByName(pokemon).then(function(response) {
//    return response 
// });

// Get a Pokemon's type info:
// P.getTypeByName(type).then(function(response) {
  //  return response;
// });

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


// function getTypeData(type) {
//   P.getTypeByName(type).then(function(response) {
//     console.log('Type Info: ')
//     console.log(response)
//   })
// }

console.log('TRY TO GET TYPE:')
getType('fire');



// with await, be sure to be in an async function (and in a try/catch)
(async () => {
  const golduck = await P.getPokemonByName("golduck")
  console.log(golduck)
})()


const displayPokemon = async (pokemon) => {
  // Retrieve Pokemon data from api by name
  try {
    console.log('start await')
    let response = await P.getPokemonByName(pokemon)
    const name = capitalize(response.name);
    let typesData = response.types;
    let types = [];
    typesData.forEach(element => {
      let currentType = element.type.name;
      types.push(currentType)
    });
    const image = response.sprites.front_default
    const weak = '';
    const strong = '';

    let content = '';
    content += `<image src="${image}">`
    content += `<p>Name: ${name}</p>`
    content += `<p>Type: ${types}</p>`
    content += `<p>Weak Against: </p>`
    content += `<p>Strong Against: </p>`
    
    display(root, content);

    console.log(response);
    
    console.log(types);
    return types;
  }
  catch (err) {
    console.log('Failed to load data from Pokemon API. ERROR:', err);
  }
}

displayPokemon('charmander')