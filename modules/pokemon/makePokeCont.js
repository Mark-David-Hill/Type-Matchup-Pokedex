const getTypes = require("./getTypes")
const U = require("../util/util")
const typeTemplate = require("./typeTemplate")
const getDmgRel = require("./getDmgRel");
const getDmgProfile = require("./getDmgProfile");
const defDmgTemplate = require("./defDmgTemplate");
const displayWeakness = require("./displayWeakness");
const displayResists = require("./displayResists");
const displayImmunity = require("./displayImmunity");
const getEvolutionsByName = require("./getEvolutionsByName");

// Creates HTML content for the data of a given Pokemon
module.exports = (pokemon, allTypesData) => {
  // Set up HTML element variables

  const pokeSelectEl = U.getEl('pokeSelect');
  // const pokeNameEl = U.getEl('pokeName');
  const pokeIdEl = U.getEl('pokeId');
  const pokeImageEl = U.getEl('pokeImage');
  const pokeTypesEl = U.getEl('pokeTypes')
  
  const resistsTypesEl = U.getEl('resistsTypes')
  const immuneToTypesEl = U.getEl('immuneToTypes')
  // Hid or reveal when necessary
  
  const resistsRowEl = U.getEl('resistsRow')
  const immuneToRowEl = U.getEl('immuneToRow')
  
  let id = '';
  // Only show id# if part of main Pokedex, not for alternate forms
  if (pokemon.id < 1000) {
    id = `#${pokemon.id}`
  } 


  // 
  // Set up Data Variables
  //

  const cName = U.capitalize(pokemon.name);
  const name = pokemon.name;
  const image = pokemon.sprites.other[`official-artwork`].front_default
  // const image = pokemon.sprites.front_default
  const types = getTypes(pokemon);
  const type1 = types[0];
  const type2 = types[1];
  const dmgProfile = getDmgProfile(type1, type2, allTypesData)

  const dmgProfCont = defDmgTemplate(dmgProfile);
  

  const type1Cont = typeTemplate(type1);
  let type2Cont = ''
  // Only generate HTML content for type2 if there is a second type
  if (type2) {
    type2Cont = typeTemplate(type2);
  }

  // 
  // Set up HTML content
  // 

  // pokeNameEl.textContent = `${name}`;
  pokeSelectEl.innerHTML = `<option id="option1" value="${name}" selected>${cName}</option>`

  pokeIdEl.textContent = `${id}`;
  pokeImageEl.src = `${image}`;
  pokeImageEl.alt = `${name}`;
  pokeImageEl.style.display = 'block';
  pokeTypesEl.innerHTML = `${type1Cont}
  ${type2Cont}`;
  resistsTypesEl.innerHTML = '';
  immuneToTypesEl.innerHTML = '';

  displayWeakness(dmgProfile);
  displayResists(dmgProfile);
  displayImmunity(dmgProfile);

  getEvolutionsByName(name);

  let content = "";
  return content;
}

    
