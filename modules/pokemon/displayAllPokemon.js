module.exports = (allPokemon) => {
    // Uses created Pokemon array to create HTML content/display it to the screen.
    let content = '';
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