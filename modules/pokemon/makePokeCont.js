// Takes in a filtered list of Pokemon data and creates HTML content to display
module.exports = (pokemon) => {
  const image = pokemon.sprites.other[`official-artwork`].front_default
  // const image = pokemon.sprites.front_default
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
  return content;
}

    
