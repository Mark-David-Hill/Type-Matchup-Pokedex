const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async () => {
    const interval = {
        // Where to start (0 = beginning of Pokemon list (Bulbasaur))
        offset: 0,
        // How many Pokemon to return (905 is max number pre Scarlet and Violet)
        // 905 includes new Pokemon from Legends Arceus but those don't have sprites
        // 898 Has all Pokemon through Sword/Shield (all have sprites)
        // 905 Includes Legends Arceus Pokemon with sprites
        //1008 Includes Scarlet/Violet Pokemon but no sprites yet
        limit: 905,
    }
    
    // Retrieve list of all Pokemon given specified interval. Includes name and url
    try {
        let response = await P.getPokemonsList(interval);
        // toDo(response);
        return response.results;
    }
    catch (err) {
        console.log('Failed to load data from Pokemon API. ERROR:', err);
    }
}