const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = (allPokemon) => {
    // Uses created Pokemon array to create HTML content/display it to the screen.
    let content = '';
    // <div class="col-4 col-md-3 col-lg-2"></div>
    allPokemon.forEach(pokemon => {
    content += `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
                    <div class="card">
                        <button type="button" class="btn pokeBtn">
                            <img id="${pokemon.name}" class="pokeImg" src="${pokemon.image}" alt="${pokemon.name}"/>
                        </button>
                    </div>
                </div>`
    
    });
    // Display Pokemon data to root element
    document.getElementById('root');
    root.innerHTML = content;
}