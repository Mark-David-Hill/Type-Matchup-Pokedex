const getTypePokemon = require("./getTypePokemon");

module.exports = (allTypesData) => {
    let pokeList = [];
    for (let i = 0; i < allTypesData.length; i++) {
        allTypesData[i].pokemon.forEach(pokemon => {
            const pokeName = pokemon.pokemon.name;
            if (pokeList.includes(pokeName)) {
                const index = pokeList.indexOf(pokeName);
                if (index !== -1) {
                    pokeList.splice(index, 1);
                }
            }
            else {
                pokeList.push(pokeName);
            }
        });
    }

    return pokeList;
}