const getTypes = require("./getTypes")

// Creates HTML content for the data of a given Pokemon
module.exports = (pokemon) => {
  const image = pokemon.sprites.other[`official-artwork`].front_default
  // const image = pokemon.sprites.front_default
  const types = getTypes(pokemon);
  const type1 = types[0];
  const type2 = types[1];
  let type2Cont = ''
  // Only generate HTML content for type2 there is a second type
  if (type2) {
    type2Cont = `<div class="row">
                  <p>${type2}</p>
                </div>`
  }
  console.log('types test:')
  console.log(type1)
  console.log(type2)
  let content = "";
  content += `
    <div class="row">
      <img src="${image}" alt="${pokemon.name}"/>
    </div>
    <div class="row">
      <div class="col">
        <h2 class="text-center">#${pokemon.id} ${pokemon.name}</h2>
      </div>
      <div class="col">
        <div class="row">
          <p>${type1}</p>
        </div>
        ${type2Cont}
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

    
