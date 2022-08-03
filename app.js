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

let allPokemon = undefined;

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
    rawPokeList = response.results;
    const promises = [];

    for (let i = 0; i < rawPokeList.length; i++) {
      const pokemon = rawPokeList[i].name;
      promises.push(P.getPokemonByName(pokemon))
    }

    // returns results once every promise is fulfilled. Makes sure data for each Pokemon is returned and that it is in the correct order
    Promise.all(promises)
      .then( results => {
        // 
        // Creates an array of data for all Pokemon
        // 
        allPokemon = results.map((result) => ({
          id: result.id,
          name: result.name,
          image: result.sprites.front_default
          // types = result.types.map((type) => type)
        }));

        console.log(allPokemon)

        // 
        // Using created Pokemon array, uses data to create HTML content/display it to the screen.
        // 
        const root = document.getElementById('root');
        let content = '';

        allPokemon.forEach(pokemon => {
          content += `<p>#${pokemon.id} ${pokemon.name}</p>`
        });
        // Display Pokemon data to root element
        root.innerHTML = content;
    })
})

const searchBar = document.getElementById('search');

const search = () => {
  if (allPokemon) {
    let searchStr = searchBar.value;
    const checkSearch = (pokemon) => {
      return pokemon.name.includes(searchStr);
    }
    const filtered = allPokemon.filter(checkSearch);
    
    let content = '';

    filtered.forEach(pokemon => {
      content += `<p>#${pokemon.id} ${pokemon.name}</p>`
    });
    // Display Pokemon data to root element
    root.innerHTML = content;
  }
}

searchBar.oninput = search;