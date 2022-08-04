const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = (allPokemon) => {
    // Uses created Pokemon array to create HTML content/display it to the screen.
    let content = '';

    allPokemon.forEach(pokemon => {
    content += `<div class="col-4 col-md-3 col-lg-2">
                    <div class="card">
                    <button type="button" class="btn">
                        <img id="${pokemon.name}" src="${pokemon.image}" alt="${pokemon.name}"/>
                    </button>
                    </div>
                </div>`
    // content += `<p>#${pokemon.id} ${pokemon.name}</p>`
    // content += `<img src="${pokemon.image}" alt="${pokemon.name}"/>`
    });
    // Display Pokemon data to root element
    document.getElementById('root');
    root.innerHTML = content;
}