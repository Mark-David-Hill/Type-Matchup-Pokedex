// Custom utility functions for working with Pokemon Data
const PD = require('./modules/pokemon/pokedexUtil');
// general utility functions
const U = require('./modules/util/util');

const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

// 
// Initialize- retrieve data for all Pokemon/display to screen
// 

let allPokemon = undefined;
let allTypesData = null;

const getAllTypesData = async () => {
  try {
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];

    let promises = [];
    // Create array of promises for retrieving type data
    for (let i = 0; i < types.length; i++) {
        promises.push(P.getTypeByName(types[i]));
    }
    
    await Promise.all(promises).then((results) => {
        // allTypesData = results;
        console.log('new all types data test in app.js:')
        console.log(results);
        allTypesData = results;
    });
  }
  catch(err){
      console.log('Error when retrieving type data:')
      console.log(err);
  }
}

const initialize = async () => {
  const pokeData = await PD.getAllPokemon();
  allPokemon = PD.makePokeArray(pokeData);
  PD.displayAllPokemon(allPokemon);
}

initialize();
getAllTypesData();

// setTimeout(() => {
//   console.log('new test: this is what is in allTypesData:')
//   console.log(allTypesData);
// }, 3000)


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
    PD.getPokemon(pokeName, allTypesData)
    .then((response) => {
      const pokemon = response;
      const pokeModal = U.getEl('modalContent');
      content = PD.makePokeCont(pokemon, allTypesData);
      pokeModal.innerHTML = content;
    })
  // }
});


// const cache = {};