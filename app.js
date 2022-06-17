// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const getPokemon = require('./modules/pokemon/getPokemon');
const getType = require('./modules/pokemon/getType');
const util = require('./modules/util/util');
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;
const log = util.log;
const root = getEl('root');


// const message = capitalize('hello friend');
// display(root, message)


// let newPokemon = getPokemon('charizard');

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
getType('normal')



function displayPokemon(pokemon) {
  // Retrieve Pokemon data from api by name
  P.getPokemonByName(pokemon)
  .then(function(response) {
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
  })
}

displayPokemon('mew')