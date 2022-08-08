const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
const getTypes = require("./getTypes");

module.exports = (type) => {
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];

    let promises = [];
    // Create array of promises for retrieving type data
    for (let i = 0; i < types.length; i++) {
        promises.push(P.getTypeByName(types[i]));
    }
    
    let allTypesData = undefined;

    Promise.all(promises).then((results) => {
        allTypesData = results;
        console.log('all types data test:')
        console.log(allTypesData);
        return allTypesData;
    })
}
