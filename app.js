// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({ cacheImages: true });
const getPokemon = require('./modules/pokemon/getPokemon');
const getType = require('./modules/pokemon/getType');
const getTypes = require('./modules/pokemon/getTypes');
const util = require('./modules/util/util');
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;
const log = util.log;

const cache = {};

const root = getEl('root');
const displayPokemon = require('./modules/pokemon/displayPokemon');

let allPokemon = undefined;

// 
// //
// Get array of Pokemon
// //
// 

const interval = {
  // Where to start (0 = beginning of Pokemon list (Bulbasaur))
  offset: 0,
  // How man Pokemon to return (905 is max number pre Scarlet and Violet)
  // 905 includes new Pokemon from Legends Arceus but those don't have sprites
  limit: 898,
}

// Returns an array of all pokemon with name and url
P.getPokemonsList(interval).
  then((response) => {
    rawPokeList = response.results;

    // Create modified array that includes each Pokemon's id, name, and index
    allPokemon = rawPokeList.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      url: pokemon.url
      // types = result.types.map((type) => type)
    }));

    console.log(allPokemon)

    // 
    // Using created Pokemon array, uses data to create HTML content/display it to the screen.
    // 
    let content = '';

    allPokemon.forEach(pokemon => {
      content += `<div class="col-4 col-md-3 col-lg-2">
                    <div class="card">
                      <button type="button" class="btn">
                        <img id="${pokemon.name}" src="${pokemon.image}" alt="${pokemon.name}"/>
                      </button>
                    </div>
                  </div>`
      // content += `<p>#${pokemon.id} ${pokemon.name}</p>`
      // content += `<img src="${pokemon.image}" alt="${pokemon.name}"/>`
    });
    // Display Pokemon data to root element
    root.innerHTML = content;
})

// 
// //
// Search Functionality
// //
// 


const searchBar = getEl('search')

// Function to run when user types in search bar
const search = () => {
  if (allPokemon) {
    let searchStr = searchBar.value;
    const checkSearch = (pokemon) => {
      return pokemon.name.includes(searchStr);
    }
    const filtered = allPokemon.filter(checkSearch);
    
    let content = '';

    filtered.forEach(pokemon => {
      content += `<div class="col-4 col-md-3 col-lg-2">
                    <div class="card">
                      <button type="button" class="btn">
                        <img id="${pokemon.name}" src="${pokemon.image}" alt="${pokemon.name}"/>
                      </button>
                    </div>
                  </div>`
    });
    // Display Pokemon data to root element
    root.innerHTML = content;
  }
}

searchBar.oninput = search;



root.addEventListener("click", (event) => {
  const pokeModal = getEl('modalContent');
  const pokeName = event.target.id;
  getPokemon(pokeName)
    .then((response) => {
      const pokemon = response;
      const image = pokemon.sprites.front_default
      let content = "";
      content += `<div class="row">
                    <img src="${image}" alt="${pokemon.name}"/>
                  </div>
                  <div class="row">
                    <div class="col">
                      <h2 class="text-center">#${pokemon.id} ${pokemon.name}</h2>
                    </div>
                    <div class="col">
                      <div class="row">
                        <p>Type 1</p>
                      </div>
                      <div class="row">
                        <p>Type 2</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <p>Weak To:</p>
                  </div>
                  <div class="row">
                    <p>Resistant To:</p>
                  </div>
                  <div class="row">
                    <p>Immune To:</p>
                  </div>`
      pokeModal.innerHTML = content;
    })
  
})