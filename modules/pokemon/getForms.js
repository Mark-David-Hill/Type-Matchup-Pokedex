const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async (pokemon) => {
    let forms = [];
    // console.log('pokemon::')
    // console.log(pokemon)
    formData = await P.getPokemonSpeciesByName(pokemon).then((response) => {
        response.varieties.forEach(pokeData => {
            let formName = pokeData.pokemon.name;
            // forms.push(formName);
            if (!formName.includes('totem')) {
                if (pokemon === 'pikachu') {
                    if (formName === 'pikachu' || formName === 'pikachu-gmax') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'eevee') {
                    if (formName !== 'eevee-starter') {
                        forms.push(formName);
                    }
                }
                else {
                    forms.push(formName);
                }
            }
        });
    })    
    return forms;
}