// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const getPokemon = require('./modules/getPokemon');
const printHello = require('./modules/print-hello');
const util = require('./modules/util/util');
printHello();
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;

console.log(capitalize('adsadfs yoyoyo'));

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



function displayPokemon(pokemon) {
  // Retrieve Pokemon data from api by name
  P.getPokemonByName(pokemon)
  .then(function(response) {
    const name = response.name;
    let typesData = response.types;
    let types = [];
    typesData.forEach(element => {
      let currentType = element.type.name;
      types.push(currentType)
    });
    const image = response.sprites.front_default

    let content = '';
    content += `<image src="${image}">`
    content += `<p>Name: ${name}</p>`
    content += `<p>Type: ${types}</p>`
    
    display(root, content);

    console.log(response);
    
    console.log(types);
    return types;
  })
}

displayPokemon('charizard')