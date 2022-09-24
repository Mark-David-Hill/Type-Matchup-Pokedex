const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();
const getForms = require("./getForms");

module.exports = (pokeName) => {
    P.getPokemonSpeciesByName(pokeName).then(function(response) {
        const evoData = response.evolution_chain.url;
        let id = evoData.substring(26);
        id = id.replace(/\D/g, '');
        const evoChain = P.getEvolutionChainById(id).then((response) => {
            console.log(`evoChain #${id}:`)
            // console.log(response);
            let evolutions = [];
            
            let form1 = response.chain.species.name;
            // console.log(`First Form: ${form1}`)
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
                response.chain.evolves_to.forEach(form2 => {
                    form2.evolves_to.forEach(form3 => {
                        forms3.push(form3.species.name)
                    });
                })
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
    
            // getForms(evolutions[0]);
            return evolutions;
        })
    })
}
    