module.exports = (type) => {
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
    let id = null;
    for (let i = 0; i < types.length; i++) {
        if (types[i] === type) {
            id = i;
            return id;
        } 
    }
}