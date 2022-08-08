// Custom utility functions for working with Pokemon Data
const PD = require('./modules/pokemon/pokedexUtil');
// general utility functions
const U = require('./modules/util/util');

// 
// Initialize- retrieve data for all Pokemon/display to screen
// 

let allPokemon = undefined;
let allTypesData = undefined;

const initialize = async () => {
  const pokeData = await PD.getAllPokemon();
  allPokemon = PD.makePokeArray(pokeData);
  PD.displayAllPokemon(allPokemon);
  allTypesData = PD.getAllTypesData();
}

initialize();



// 
// Search Functionality
// 

const searchBar = U.getEl('search')

// Function to run when user types in search bar
const search = () => {
  if (allPokemon) {
    const filteredList = PD.pokeSearch(allPokemon, searchBar);
    const content = PD.makeFiltCont(filteredList);
    // Display Pokemon data based on search
    const root = U.getEl('root');
    root.innerHTML = content;
  }
}

// run when user types in search bar
searchBar.oninput = search;

// 
// Show info for individual Pokemon
// 

const root = U.getEl('root');

root.addEventListener("click", (event) => {
  
  const pokeName = event.target.id;
  // if (allPokemon && allTypesData) {
    PD.getPokemon(pokeName)
    .then((response) => {
      const pokemon = response;
      const pokeModal = U.getEl('modalContent');
      content = PD.makePokeCont(pokemon, allTypesData);
      pokeModal.innerHTML = content;
    })
  // }
});


// const cache = {};