// Takes in a filtered list of Pokemon data and creates HTML content to display
module.exports = (filtered) => {
  let content = '';

  filtered.forEach(pokemon => {
    content += `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div class="card">
                    <button type="button" class="btn pokeBtn">
                      <img id="${pokemon.name}" class="pokeImg" src="${pokemon.image}" alt="${pokemon.name}"/>
                    </button>
                  </div>
                </div>`
  });
  return content;
}

    
