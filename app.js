// Custom utility functions for working with Pokemon Data
const PD = require('./modules/pokemon/pokedexUtil');
// general utility functions
const U = require('./modules/util/util');
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();


let allPokemon = null;
let allTypesData = null;
let singleTypedPokemon = null;

// 
// Local Storage
// 

// localStorage.removeItem('allPokemon');

// All Pokemon Data
if (localStorage.allPokemon) {
  rawData = localStorage.getItem('allPokemon');
  allPokemon = JSON.parse(rawData);
}
// All Types Data
if (localStorage.allTypesData) {
  rawData = localStorage.getItem('allTypesData');
  allTypesData = JSON.parse(rawData);
}

// 
// Initialize- retrieve data for all Pokemon/display to screen
// 

const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];

// Get Type Data
const getAllTypesData = async () => {
  try {

    let promises = [];
    // Create array of promises for retrieving type data
    for (let i = 0; i < types.length; i++) {
        promises.push(P.getTypeByName(types[i]));
    }
    
    await Promise.all(promises).then((results) => {
        allTypesData = results;
        console.log('All Types Data:');
        console.log(allTypesData);
        localStorage.setItem('allTypesData', JSON.stringify(allTypesData));
        search();
        singleTypedPokemon = PD.getSingleTyped(allTypesData);
    });
  }
  catch(err){
      console.log('Error when retrieving type data:')
      console.log(err);
  }
}

// Get all Pokemon Data / display to screen
const initialize = async () => {
  // Request data from Poke API if not in local storage
  if (!allPokemon) {
    try {
      const pokeData = await PD.getAllPokemon();
      allPokemon = PD.makePokeArray(pokeData);
      localStorage.setItem('allPokemon', JSON.stringify(allPokemon));
    } catch (error) {
      console.log('Error: Data could not be retrieved from the Poke API.')
      console.log(error);
    }
  }
  // Change justification for root element before loading spinner is replaced w/Poke data
  const root = U.getEl('root');
  if (allPokemon) {
    root.classList.remove('justify-content-center');
    PD.displayAllPokemon(allPokemon);
  }
  else {
    const content = `<p class="text-center">Something went wrong, we weren't able to load this data from the Poke API. Please try refreshing the page.</p>`
    root.innerHTML = content;
  }
}

// setTimeout(() => {
  initialize();
// }, 2000)

if (!allTypesData) {
  getAllTypesData();
}
else {
  singleTypedPokemon = PD.getSingleTyped(allTypesData);
}


// 
// Search Functionality
// 

const searchBar = U.getEl('search');
const type1El = U.getEl('type1');
const type2El = U.getEl('type2');

// Clear selected types
const clear = () => {
  type1El.selectedIndex = 0;
  type2El.selectedIndex = 0;
  searchBar.value = "";
  // Re-runs the filter/displays results
  search();
}

const clearBtnEl = U.getEl('clearBtn');
const clearBtn2El = U.getEl('clearBtn2');
clearBtnEl.addEventListener("click", clear);
clearBtn2El.addEventListener("click", clear);


// Function to run when user types in search bar or changes type
const search = () => {
  if (allPokemon) {
    // Filter by Search String
    const filteredList = PD.pokeSearch(allPokemon, searchBar);
    let finalList = null;

    // Set disabled state for the Type2 Selector based on if Type1 has been selected.
    if (type1El.value !== "none") {
      type2El.disabled = false;
    }
    else {
      type2El.disabled = true;
    }

    // Reset styling for Type Selections
    const typeBtns = [type1El, type2El];
    // Remove type classes
    typeBtns.forEach(typeEl => {
      typeEl.classList.remove('type')
      typeEl.classList.remove('noType')
      types.forEach(type => {
        typeEl.classList.remove(type);
      });
    });

    // 
    // Filter by Type
    // 
    if (type1El.value !== "none" || (type2El.value !== "none") && type2El.value !== "noType") {
      let type1Pokemon = null;
      let type2Pokemon = null;
      let typePokemon = null;
      // Type1
      if (type1El.value !== "none") {
        const type1 = type1El.value;
        const type1Id = PD.getTypeId(type1);
        // Set type1 selection style
        type1El.classList.add('type')
        type1El.classList.add(type1)

        const type1Data = allTypesData[type1Id];
        type1Pokemon = PD.getTypePokemon(type1Data);
      }
      // Type2
      if (type2El.value !== "none" && type2El.value !== "noType") {
        const type2 = type2El.value;
        const type2Id = PD.getTypeId(type2);
        // Set type1 selection style
        type2El.classList.add('type')
        type2El.classList.add(type2)

        const type2Data = allTypesData[type2Id];
        type2Pokemon = PD.getTypePokemon(type2Data);
      }
      
      if (type1Pokemon && type2Pokemon) {
        typePokemon = [];
        type1Pokemon.forEach(pokemon => {
          if (type2Pokemon.includes(pokemon)) {
            typePokemon.push(pokemon);
          }
        });
      }
      else if (type1Pokemon) {
        // If the Pokemon is single-typed
        if (type2El.value === 'noType') {
          const isSingleTyped = (pokemon) => {
            let result = false;
            singleTypedPokemon.forEach(stp => {
              if (stp === pokemon) {
                result = true;
              }
            });
            // result = singleTypedPokemon.includes(pokemon);
            return result;
          }

          typePokemon = type1Pokemon.filter(isSingleTyped);
        }
        // The Pokemon can have 1 or 2 types
        else {
          typePokemon = type1Pokemon;
        }
      }
      else if (type2Pokemon) {
        typePokemon = type2Pokemon;
      }

      // Filter Search filtered list of Pokemon based on if they have the specified types

      const checkTypePokemon = (pokemonToCheck) => {
        let includePokemon = false;
        typePokemon.forEach(tp => {
          if (pokemonToCheck.name === tp) {
            includePokemon = true;
          }
        });
        return includePokemon;
      }

      const typeFiltered = filteredList.filter(checkTypePokemon);
      finalList = typeFiltered;
    }
    // If no types are selected, just use search string filtered list
    else {
      finalList = filteredList;
    }

    if(finalList) {
      let content = '';
      const resultsEl = U.getEl('results');
      if (finalList.length > 0) {
        const numResults = finalList.length;
        resultsEl.innerText = `Showing ${numResults} Results`
        content += PD.makeFiltCont(finalList);
      }
      else {
        resultsEl.innerText = '0 Results. No Pokémon match those criteria'
      }
      // Display Pokemon data based on search
      const root = U.getEl('root');
      root.innerHTML = content;
    }
  }
}

// run when user types in search bar
searchBar.oninput = search;

// 
// Show info for individual Pokemon
// 

const root = U.getEl('root');
const myModal = new bootstrap.Modal(document.getElementById("pokeModal"), {});



const displayPokemon = (pokeName) => {
  // Make sure pokeName has been successfully set
  if (pokeName) {
    // Reset modal content
    const pokeNameEl = U.getEl('pokeName');
    pokeNameEl.innerText = ''

    // Begin to display modal
    myModal.show();

    const pokeTypesEl = U.getEl('pokeTypes')
    pokeTypesEl.innerHTML = '';
    const weakToTypesEl = U.getEl('weakToTypes');
    const resistsTypesEl = U.getEl('resistsTypes');
    const immuneToTypesEl = U.getEl('immuneToTypes');
    const dmgLabels = document.getElementsByClassName('dmgLabel');
    for (let i = 0; i < dmgLabels.length; i++) {
      dmgLabels[i].classList.add('hideText');
    }
    weakToTypesEl.innerHTML = '';
    resistsTypesEl.innerHTML = '';
    immuneToTypesEl.innerHTML = '';

    // Display Load Animations
    const loadEls = document.getElementsByClassName('load');
    for (let i = 0; i < loadEls.length; i++) {
      const element = loadEls[i];
      if (element.classList.contains('load-outer')) {
        element.style.display = 'flex';
      }
      else if (window.screen.width >= 500) {
        element.style.display = 'flex';
      }
    }

    // Uncomment below to check loading styles
    // setTimeout(() => {
      try {
        PD.getPokemon(pokeName, allTypesData)
        .then((response) => {
          const pokemon = response;
          const pokeModal = U.getEl('modalContent');
          // Hide load animations
          for (let i = 0; i < loadEls.length; i++) {
            const element = loadEls[i];
            element.style.display = 'none';
          }
          for (let i = 0; i < dmgLabels.length; i++) {
            dmgLabels[i].classList.remove('hideText');
          }
          content = PD.makePokeCont(pokemon, allTypesData);
        })
      } catch (error) {
        console.log('Error: Data could not be retrieved from the Poke API.')
        console.log(error);
        // Hide load animations
        for (let i = 0; i < loadEls.length; i++) {
          const element = loadEls[i];
          element.style.display = 'none';
        }
        // Display error to screen
        const modalErrorEl = U.getEl('modalError');
        const content = `<p class="text-center">Something went wrong, we weren't able to load this data from the Poke API. Please try reloading the Pokémon or refreshing the page.</p>`
        modalErrorEl.innerHTML = content;
        modalErrorEl.classList.remove('d-none');
        modalErrorEl.classList.add('d-block');
      }
      
    // Uncomment below to check loading styles
    // }, 5000)

    
  }
}

// Click event when clicking Pokemon sprite buttons
root.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.id !== "root") {
    let pokeName = '';
    const imgEl = U.getEl('pokeImage');
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

type1El.addEventListener("change", search);
type2El.addEventListener("change", search);

// Event for When 'Enter' is pressed in the Search Bar
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
    else {
      const pokeImgs = root.getElementsByClassName('pokeImg');
      pokeName = pokeImgs[0].id;
      displayPokemon(pokeName);
    }
  }
});


// const cache = {};