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

// Get Type Data
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
        // console.log('new all types data test in app.js:')
        // console.log(results);
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

const myModal = new bootstrap.Modal(document.getElementById("pokeModal"), {});

// Click image:
// [img#bulbasaur, button.btn,
// Click button:
// [button.btn, div.card,
// Click between:
// div#root.row.g-4, div.container, body.modal-open

const displayPokemon = (pokeName) => {
  // Make sure pokeName has been successfully set
  if (pokeName) {
    // Reset modal content

    // Begin to display modal
    myModal.show();

    PD.getPokemon(pokeName, allTypesData)
    .then((response) => {
      const pokemon = response;
      const pokeModal = U.getEl('modalContent');
      content = PD.makePokeCont(pokemon, allTypesData);
      // pokeModal.innerHTML = content;
    })
  }
}

// Click event when clicking Pokemon sprite buttons
root.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.id !== "root") {
    let pokeName = '';
    let imgEl = U.getEl('pokeImage');
    imgEl.src = ""
    imgEl.style.display = 'none';
    // imgEl.src = "https://via.placeholder.com/525x500"
    if (clickedElement.classList.contains('pokeImg')) {
      pokeName = clickedElement.id;
    } 
    else if (clickedElement.classList.contains('pokeBtn')) {
      pokeName = clickedElement.children[0].id; 
    }

    displayPokemon(pokeName);
    
  }
});

searchBar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    // Check for exact match for Pokemon
    let exactMatch = false;
    let searchStr = searchBar.value.toLowerCase();
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      if (searchStr === pokemon.name) {
        exactMatch = true;
        break;
      }
    }
    if (exactMatch) {
      displayPokemon(searchStr)
    }
    // else {
    //   const pokeImgs = root.getElementsByClassName('pokeImg');
    //   pokeName = pokeImgs[0].id;
    //   displayPokemon(pokeName);
    // }
  }
});

// module.exports = (allPokemon, searchBar) => {
//   let searchStr = searchBar.value.toLowerCase();

//   const checkSearch = (pokemon) => {
//     return pokemon.name.includes(searchStr);
//   }
//   const filtered = allPokemon.filter(checkSearch);
//   return filtered;
// }


// const cache = {};