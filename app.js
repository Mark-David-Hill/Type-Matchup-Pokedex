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

//
// Get array of all Pokemon (name and url)
// 

const interval = {
  // Where to start (0 = beginning of Pokemon list (Bulbasaur))
  offset: 0,
  // How man Pokemon to return (905 is max number pre Scarlet and Violet)
  limit: 905,
}
// Returns an array of all pokemon with name and url
P.getPokemonsList(interval).
  then((response) => {
    const allPokemon = response.results;
    const root = document.getElementById('root');
    let content = '';

    const promises = [];

    for (let i = 0; i < 151; i++) {
      const pokemon = allPokemon[i].name;
      promises.push(P.getPokemonByName(pokemon))
    }

    // returns results once every promise is fulfilled. Makes sure data for each Pokemon is returned and that it is in the correct order
    Promise.all(promises)
      .then( results => {
        // Creates an array of data for all Pokemon
        const pokemon = results.map(result => {
          const id = result.id;
          const name = result.name;
          const image = result.sprites.front_default;
          // types = result.types.map((type) => type);
          content += `<p>#${id} ${name}</p>`
        });
        
        // Display Pokemon data to root element
        root.innerHTML = content;
    })
  
})