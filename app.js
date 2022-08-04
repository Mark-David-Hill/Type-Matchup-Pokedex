// 
// Modules
// 

// Custom utility functions for working with Pokemon Data
const PD = require('./modules/pokemon/pokedexUtil');
// general utility functions
const U = require('./modules/util/util');

// const cache = {};

// 
// Initialize- retrieve data for all Pokemon/display to screen
// 

const initialize = async () => {
  const pokeData = await PD.getAllPokemon();
  const allPokemon = PD.makePokeArray(pokeData);
  PD.displayAllPokemon(allPokemon);
}

initialize();

// 
// Search Functionality
// 


const searchBar = U.getEl('search')

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
    const root = U.getEl('root');
    root.innerHTML = content;
  }
}

searchBar.oninput = search;

// 
// Show info for individual Pokemon
// 

const root = U.getEl('root');

root.addEventListener("click", (event) => {
  const pokeModal = U.getEl('modalContent');
  const pokeName = event.target.id;
  PD.getPokemon(pokeName)
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