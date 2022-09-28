const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async (pokemon) => {
    let forms = [];
    formData = await P.getPokemonSpeciesByName(pokemon).then((response) => {
        response.varieties.forEach(pokeData => {
            forms.push(pokeData.pokemon.name);
        });
    })    
    return forms;
}