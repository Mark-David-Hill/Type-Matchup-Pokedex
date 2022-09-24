const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = (pokemon) => {
    let forms = [];
    console.log('name test:')
    console.log(pokemon)
    P.getPokemonSpeciesByName(pokemon).then(function(response) {
        response.varieties.forEach(pokeData => {
            forms.push(pokeData.pokemon.name);
        });
        // response.varieties[0].pokemon.name
        console.log('forms:');
        console.log(forms);
        return forms;
    });
}
    
    