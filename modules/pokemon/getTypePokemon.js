
module.exports = (typeData) => {
    const typePokemon = typeData.pokemon;
    let typeNames = [];
    for (let i = 0; i < typePokemon.length; i++) {
    const pokeName = typePokemon[i].pokemon.name;
    typeNames.push(pokeName);
    }
    return typeNames;
}