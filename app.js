// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({ cacheImages: true });
const getPokemon = require('./modules/pokemon/getPokemon');
const getAllPokemon = require('./modules/pokemon/getAllPokemon');
const makePokeArray = require('./modules/pokemon/makePokeArray');
const displayAllPokemon = require('./modules/pokemon/displayAllPokemon');
const getType = require('./modules/pokemon/getType');
const getTypes = require('./modules/pokemon/getTypes');
const util = require('./modules/util/util');
const capitalize = util.capitalize;
const getEl = util.getEl;
const display = util.display;
const log = util.log;

const cache = {};


// // General Utility functions
// const util = require('./modules/util/util');
// const U = new util;

// // Custom functions for working with 
// const PokeUtil = require('./modules/pokemon/pokeUtil');
// const Pu = new PokeUtil;

// // Poke API functions
// const Pokedex = require("pokeapi-js-wrapper");
// const P = new Pokedex.Pokedex({ cacheImages: true });

// const cache = {};

const root = getEl('root');

// 
// Initialize- retrieve data for all Pokemon/display to screen
// 

const initialize = async () => {
  const pokeData = await getAllPokemon();
  const allPokemon = makePokeArray(pokeData);
  displayAllPokemon(allPokemon);
}

initialize();

// 
// //
// Search Functionality
// //
// 


const searchBar = getEl('search')

// Function to run when user types in search bar
const search = () => {
  if (allPokemon) {
    let searchStr = searchBar.value.toLowerCase();
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

// 
// //
// Show info for individual Pokemon
// //
// 

root.addEventListener("click", (event) => {
  const pokeModal = getEl('modalContent');
  const pokeName = event.target.id;
  getPokemon(pokeName)
    .then((response) => {
      const pokemon = response;
      console.log(pokemon);
      const image = pokemon.sprites.other[`official-artwork`].front_default
      // const image = pokemon.sprites.front_default
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