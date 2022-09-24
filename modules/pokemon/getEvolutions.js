const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async function(type) {
    let response = await P.getTypeByName(type)
    console.log('Type Info: ')
    console.log(response)
    return response;
}

module.exports = (pokeName) => {
    P.getPokemonSpeciesByName(pokeName).then(function(response) {
        const evoData = response.evolution_chain.url;
        let id = evoData.substring(26);
        id = id.replace(/\D/g, '');
        const evoChain = P.getEvolutionChainById(id).then((response) => {
            console.log('evoChain:')
            console.log(response);
            let evolutions = [];
            let form1 = response.chain.species.name;
            let forms2 = null;
            let forms3 = null;
            if (response.chain.evolves_to.length > 0) {
            forms2 = response.chain.evolves_to;
            }
            if (forms2[0].evolves_to[0].species.name) {
            forms3 = forms2[0].evolves_to[0].species.name;
            }
            
            // Populate evolutions
            evolutions.push(form1);
            if (forms2) {
            forms2.forEach(pokemon => {
                evolutions.push(pokemon.species.name);
            });
            }
            if (forms3) {
            evolutions.push(forms3)
            }
            
            console.log('evolutions:')
            console.log(evolutions)
        })
        return evoChain;
    })
}
    