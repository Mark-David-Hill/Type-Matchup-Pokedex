// Custom utility functions for working with Pokemon Data
const {getSingleTyped, getAllPokemon, makePokeArray, pokeSearch, displayAllPokemon, typeFilter, makeFiltCont, getPokemon, makePokeCont} = require('./modules/pokemon/pokedexUtil');
// general utility functions
const {getEl, capitalize} = require('./modules/util/util');
const Pokedex = require("pokeapi-js-wrapper");
// const { getEvolutions } = require('./modules/pokemon/pokedexUtil');
const P = new Pokedex.Pokedex();
const {getTypeByName} = P;

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
        promises.push(getTypeByName(types[i]));
    }
    
    await Promise.all(promises).then((results) => {
        allTypesData = results;
        localStorage.setItem('allTypesData', JSON.stringify(allTypesData));
        search();
        singleTypedPokemon = getSingleTyped(allTypesData);
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
      const pokeData = await getAllPokemon();
      allPokemon = makePokeArray(pokeData);
      localStorage.setItem('allPokemon', JSON.stringify(allPokemon));
    } catch (error) {
      console.log('Error: Data could not be retrieved from the Poke API.')
      console.log(error);
    }
  }
  // Change justification for root element before loading spinner is replaced w/Poke data
  const root = getEl('root');
  if (allPokemon) {
    root.classList.remove('justify-content-center');
    displayAllPokemon(allPokemon);
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
  singleTypedPokemon = getSingleTyped(allTypesData);
}


// 
// Search Functionality
// 

const searchBar = getEl('search');
const type1El = getEl('type1');
const type2El = getEl('type2');
const pokeSelectEl = getEl('pokeSelect')

// Clear selected types
const clear = () => {
  type1El.selectedIndex = 0;
  type2El.selectedIndex = 0;
  searchBar.value = "";
  // Re-runs the filter/displays results
  search();
}

const clearBtnEl = getEl('clearBtn');
const clearBtn2El = getEl('clearBtn2');
clearBtnEl.addEventListener("click", clear);
clearBtn2El.addEventListener("click", clear);

// Run when Pokemon is selected from drop-down in modal
const selectPokemon = () => {
  const imgEl = getEl('pokeImage');
  imgEl.alt = '';
  imgEl.src = '';
  const pokemon = pokeSelectEl.value;
  displayPokemon(pokemon);
}

// Function to run when user types in search bar or changes type
const search = () => {
  if (allPokemon) {
    // Filter by Search String
    const filteredList = pokeSearch(allPokemon, searchBar);

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

    const filterData = {
      type1El,
      type2El,
      allTypesData,
      filteredList, 
      singleTypedPokemon
    }

    // Filter by Type
    let finalList = typeFilter(filterData);

    // Create and display HTML content
    if(finalList) {
      let content = '';
      const resultsEl = getEl('results');
      if (finalList.length > 0) {
        const numResults = finalList.length;
        resultsEl.innerText = `Showing ${numResults} Results`
        content += makeFiltCont(finalList);
      }
      else {
        resultsEl.innerText = '0 Results. No Pokémon match those criteria'
      }
      // Display Pokemon data based on search
      const root = getEl('root');
      root.innerHTML = content;
    }
  }
}

// run when user types in search bar
searchBar.oninput = search;

// 
// Show info for individual Pokemon
// 

const root = getEl('root');
const myModal = new bootstrap.Modal(document.getElementById("pokeModal"), {});

const displayPokemon = (pokeName) => {
  // Make sure pokeName has been successfully set
  if (pokeName) {
    // Reset modal content
    const pokeIdEl = getEl('pokeId');
    pokeSelectEl.innerHTML = `<option id="option1" value="none" selected></option>`
    
    pokeIdEl.textContent = '';

    // Begin to display modal
    myModal.show();

    const pokeTypesEl = getEl('pokeTypes')
    pokeTypesEl.innerHTML = '';
    const weakToTypesEl = getEl('weakToTypes');
    const resistsTypesEl = getEl('resistsTypes');
    const immuneToTypesEl = getEl('immuneToTypes');
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
        getPokemon(pokeName, allTypesData)
        .then((response) => {
          const pokemon = response;

          const pokeModal = getEl('modalContent');
          // Hide load animations
          for (let i = 0; i < loadEls.length; i++) {
            const element = loadEls[i];
            element.style.display = 'none';
          }
          for (let i = 0; i < dmgLabels.length; i++) {
            dmgLabels[i].classList.remove('hideText');
          }
          content = makePokeCont(pokemon, allTypesData);
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
        const modalErrorEl = getEl('modalError');
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
    const imgEl = getEl('pokeImage');
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

pokeSelectEl.addEventListener("change", selectPokemon);

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

const leftBtn = document.getElementById('leftArrow');
const rightBtn = document.getElementById('rightArrow');
const prevPokemonEl = document.getElementById('prevPokemon');
const nextPokemonEl = document.getElementById('nextPokemon');

// Next/Previous buttons
leftBtn.addEventListener("click", (event) => {
  const pokeName = prevPokemonEl.innerText;
  const targetPokemon = pokeName.replace(/(^|[\s-])\S/g, function (match) {
    return match.toLowerCase();
  }); 
  // Run when Pokemon is selected from drop-down in modal
  const imgEl = getEl('pokeImage');
  imgEl.alt = '';
  imgEl.src = '';
  displayPokemon(targetPokemon);
});

rightBtn.addEventListener("click", (event) => {
  const pokeName = nextPokemonEl.innerText;
  const targetPokemon = pokeName.replace(/(^|[\s-])\S/g, function (match) {
    return match.toLowerCase();
  }); 
  // Run when Pokemon is selected from drop-down in modal
  const imgEl = getEl('pokeImage');
  imgEl.alt = '';
  imgEl.src = '';
  displayPokemon(targetPokemon);
});