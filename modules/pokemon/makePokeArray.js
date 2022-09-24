const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = (pokeList) => {
    // Create modified array that includes each Pokemon's id, name, index, and sprite image url
    allPokemon = pokeList.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        url: pokemon.url
    }));

    // allPokemon.unshift('rattata-alola')

    console.log(allPokemon)
    return allPokemon;
}