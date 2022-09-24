const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = (id) => {
    const evoChain = P.getEvolutionChainById(id).then((response) => {
        console.log(`evoChain #${id}:`)
        // console.log(response);
        let evolutions = [];
        
        let form1 = response.chain.species.name;
        console.log(`First Form: ${form1}`)
        let forms2 = null;
        let forms3 = null;
        // If there are second evolutions
        if (response.chain.evolves_to[0]) {
            forms2 = [];
            response.chain.evolves_to.forEach(form => {
                forms2.push(form.species.name)
            });
        }
        // console.log(`2nd Form: ${forms2}`)
        // If there is a third evolution
        if (forms2 && response.chain.evolves_to[0].evolves_to[0]) {
            forms3 = [];
            response.chain.evolves_to[0].evolves_to.forEach(form => {
                forms3.push(form.species.name)
            });
        }
        // console.log(`3rd Form: ${forms3}`)

        // Populate evolutions
        evolutions.push(form1);
        if (forms2 && forms2.length > 0) {
            forms2.forEach(form => {
                evolutions.push(form);
            });
        }
        if (forms3 && forms3.length > 0) {
            forms3.forEach(form => {
                evolutions.push(form);
            });
        }
        
        console.log(evolutions)
    })
    return evoChain;
}
    

// module.exports = (pokeName) => {
//     P.getPokemonSpeciesByName(pokeName).then(function(response) {
//         const evoData = response.evolution_chain.url;
//         let id = evoData.substring(26);
//         id = id.replace(/\D/g, '');
//         const evoChain = P.getEvolutionChainById(id).then((response) => {
//             console.log(`${pokeName}'s evoChain:`)
//             console.log(response);
//             let evolutions = [];
//             let form1 = response.chain.species.name;
//             let forms2 = null;
//             let forms3 = null;
//             if (response.chain.evolves_to.length > 0) {
//             forms2 = response.chain.evolves_to;
//             }
//             if (forms2[0].evolves_to[0].species.name) {
//             forms3 = forms2[0].evolves_to[0].species.name;
//             }
            
//             // Populate evolutions
//             evolutions.push(form1);
//             if (forms2) {
//             forms2.forEach(pokemon => {
//                 evolutions.push(pokemon.species.name);
//             });
//             }
//             if (forms3) {
//             evolutions.push(forms3)
//             }
            
//             console.log('evolutions:')
//             console.log(evolutions)
//         })
//         return evoChain;
//     })
// }
    