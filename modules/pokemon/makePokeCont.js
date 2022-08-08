const getTypes = require("./getTypes")
const U = require("../util/util")
const typeTemplate = require("./typeTemplate")
const getDmgRel = require("./getDmgRel");

// Creates HTML content for the data of a given Pokemon
module.exports = (pokemon) => {

  // 
  // Set up Data Variables
  //
   
  const name = U.capitalize(pokemon.name);
  const image = pokemon.sprites.other[`official-artwork`].front_default
  // const image = pokemon.sprites.front_default
  const types = getTypes(pokemon);
  const type1 = types[0];
  const type2 = types[1];
  const type1Cont = typeTemplate(type1);
  let type2Cont = ''
  // Only generate HTML content for type2 if there is a second type
  if (type2) {
    type2Cont = typeTemplate(type2);
  }

  getDmgRel(types);

  // 
  // Set up HTML content
  // 

  let content = "";
  content += `
    <div class="row">
      <img src="${image}" alt="${name}"/>
    </div>
    <div class="d-flex flex-row">
      <div class="d-flex flex-column justify-content-center align-items-center">
        
          <h2 class="text-center align-middle m-5">#${pokemon.id} ${name}</h2>
        
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <ul class="text-center align-middle pt-4">
        ${type1Cont}
        ${type2Cont}
        </ul>
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
  return content;
}

    
