let currentVersion = 1.2;

const {
  getSingleTyped,
  getAllPokemon,
  makePokeArray,
  pokeSearch,
  displayAllPokemon,
  typeFilter,
  makeFiltCont,
  getPokemon,
  makePokeCont,
} = require("./modules/pokemon/pokedexUtil");

const { getEl } = require("./modules/util/util");
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();
const { getTypeByName } = P;

let allPokemon = null;
let allTypesData = null;
let singleTypedPokemon = null;

//
// Local Storage
//

if (!localStorage.version || localStorage.version < currentVersion) {
  localStorage.removeItem("allPokemon");
  localStorage.setItem("version", currentVersion);
}

if (localStorage.allPokemon) {
  rawData = localStorage.getItem("allPokemon");
  allPokemon = JSON.parse(rawData);
}

if (localStorage.allTypesData) {
  rawData = localStorage.getItem("allTypesData");
  allTypesData = JSON.parse(rawData);
}

//
// Initialize- retrieve data for all Pokemon/display to screen
//

const types = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

const getAllTypesData = async () => {
  try {
    let promises = [];
    for (let i = 0; i < types.length; i++) {
      promises.push(getTypeByName(types[i]));
    }

    await Promise.all(promises).then((results) => {
      allTypesData = results;
      localStorage.setItem("allTypesData", JSON.stringify(allTypesData));
      search();
      singleTypedPokemon = getSingleTyped(allTypesData);
    });
  } catch (e) {
    console.error(e, "could not retrieve type data:");
  }
};

const initialize = async () => {
  if (!allPokemon) {
    try {
      const pokeData = await getAllPokemon();
      allPokemon = makePokeArray(pokeData);
      localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
    } catch (e) {
      console.error(e, "could not retrieve data from the poke api.");
    }
  }
  const root = getEl("root");
  if (allPokemon) {
    root.classList.remove("justify-content-center");
    displayAllPokemon(allPokemon);
  } else {
    const content = `<p class="text-center">Something went wrong, we weren't able to load this data from the Poke API. Please try refreshing the page.</p>`;
    root.innerHTML = content;
  }
};

initialize();

if (!allTypesData) {
  getAllTypesData();
} else {
  singleTypedPokemon = getSingleTyped(allTypesData);
}

//
// Search Functionality
//

const searchBar = getEl("search");
const type1El = getEl("type1");
const type2El = getEl("type2");
const pokeSelectEl = getEl("pokeSelect");

const clear = () => {
  type1El.selectedIndex = 0;
  type2El.selectedIndex = 0;
  searchBar.value = "";
  search();
};

const clearBtnEl = getEl("clearBtn");
const clearBtn2El = getEl("clearBtn2");
clearBtnEl.addEventListener("click", clear);
clearBtn2El.addEventListener("click", clear);

const selectPokemon = () => {
  const imgEl = getEl("pokeImage");
  imgEl.alt = "";
  imgEl.src = "";
  const pokemon = pokeSelectEl.value;
  displayPokemon(pokemon);
};

const search = () => {
  if (allPokemon) {
    const filteredList = pokeSearch(allPokemon, searchBar);

    if (type1El.value !== "none") {
      type2El.disabled = false;
    } else {
      type2El.disabled = true;
    }

    const typeBtns = [type1El, type2El];
    typeBtns.forEach((typeEl) => {
      typeEl.classList.remove("type");
      typeEl.classList.remove("noType");
      types.forEach((type) => {
        typeEl.classList.remove(type);
      });
    });

    const filterData = {
      type1El,
      type2El,
      allTypesData,
      filteredList,
      singleTypedPokemon,
    };

    let finalList = typeFilter(filterData);

    if (finalList) {
      let content = "";
      const resultsEl = getEl("results");
      if (finalList.length > 0) {
        const numResults = finalList.length;
        resultsEl.innerText = `Showing ${numResults} Results`;
        content += makeFiltCont(finalList);
      } else {
        resultsEl.innerText = "0 Results. No Pokémon match those criteria";
      }
      const root = getEl("root");
      root.innerHTML = content;
    }
  }
};

searchBar.oninput = search;

//
// Show info for individual Pokemon
//

const root = getEl("root");
const pokeModal = new bootstrap.Modal(document.getElementById("pokeModal"), {});

const displayPokemon = (pokeName) => {
  if (pokeName) {
    const pokeIdEl = getEl("pokeId");
    pokeSelectEl.innerHTML = `<option id="option1" value="none" selected></option>`;

    pokeIdEl.textContent = "";

    pokeModal.show();

    const pokeTypesEl = getEl("pokeTypes");
    pokeTypesEl.innerHTML = "";
    const weakToTypesEl = getEl("weakToTypes");
    const resistsTypesEl = getEl("resistsTypes");
    const immuneToTypesEl = getEl("immuneToTypes");
    const dmgLabels = document.getElementsByClassName("dmgLabel");
    for (let i = 0; i < dmgLabels.length; i++) {
      dmgLabels[i].classList.add("hideText");
    }
    weakToTypesEl.innerHTML = "";
    resistsTypesEl.innerHTML = "";
    immuneToTypesEl.innerHTML = "";

    const loadEls = document.getElementsByClassName("load");
    for (let i = 0; i < loadEls.length; i++) {
      const element = loadEls[i];
      if (element.classList.contains("load-outer")) {
        element.style.display = "flex";
      } else if (window.screen.width >= 500) {
        element.style.display = "flex";
      }
    }

    try {
      getPokemon(pokeName, allTypesData).then((response) => {
        const pokemon = response;

        const pokeModal = getEl("modalContent");
        for (let i = 0; i < loadEls.length; i++) {
          const element = loadEls[i];
          element.style.display = "none";
        }
        for (let i = 0; i < dmgLabels.length; i++) {
          dmgLabels[i].classList.remove("hideText");
        }
        content = makePokeCont(pokemon, allTypesData);
      });
    } catch (e) {
      console.error(e, "could not retrieve data from the poke api.");
      for (let i = 0; i < loadEls.length; i++) {
        const element = loadEls[i];
        element.style.display = "none";
      }
      const modalErrorEl = getEl("modalError");
      const content = `<p class="text-center">Something went wrong, we weren't able to load this data from the Poke API. Please try reloading the Pokémon or refreshing the page.</p>`;
      modalErrorEl.innerHTML = content;
      modalErrorEl.classList.remove("d-none");
      modalErrorEl.classList.add("d-block");
    }
  }
};

root.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.id !== "root") {
    let pokeName = "";
    const imgEl = getEl("pokeImage");
    imgEl.src = "";
    imgEl.style.display = "none";
    if (clickedElement.classList.contains("pokeImg")) {
      pokeName = clickedElement.id;
    } else if (clickedElement.classList.contains("pokeBtn")) {
      pokeName = clickedElement.children[0].id;
    }

    displayPokemon(pokeName);
  }
});

type1El.addEventListener("change", search);
type2El.addEventListener("change", search);

pokeSelectEl.addEventListener("change", selectPokemon);

searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
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
      displayPokemon(searchStr);
    } else {
      const pokeImgs = root.getElementsByClassName("pokeImg");
      pokeName = pokeImgs[0].id;
      displayPokemon(pokeName);
    }
  }
});

const leftBtn = document.getElementById("leftArrow");
const rightBtn = document.getElementById("rightArrow");
const prevPokemonEl = document.getElementById("prevPokemon");
const nextPokemonEl = document.getElementById("nextPokemon");

leftBtn.addEventListener("click", (event) => {
  const pokeName = prevPokemonEl.innerText;
  const targetPokemon = pokeName.replace(/(^|[\s-])\S/g, function (match) {
    return match.toLowerCase();
  });
  const imgEl = getEl("pokeImage");
  imgEl.alt = "";
  imgEl.src = "";
  displayPokemon(targetPokemon);
});

rightBtn.addEventListener("click", (event) => {
  const pokeName = nextPokemonEl.innerText;
  const targetPokemon = pokeName.replace(/(^|[\s-])\S/g, function (match) {
    return match.toLowerCase();
  });
  const imgEl = getEl("pokeImage");
  imgEl.alt = "";
  imgEl.src = "";
  displayPokemon(targetPokemon);
});
