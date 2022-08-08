module.exports = (type) => {
    let color = undefined;
    switch (type) {
        case 'normal':
            color = 'A8A878';
        case 'fire':
            color = 'F08030';
        case 'water':
            color = '5BC7E5';
        case 'grass':
            color = '78C850';
        case 'electric':
            color = 'F8D030';
        case 'ice':
            color = '98D8D8';
        case 'fighting':
            color = 'C03028';
        case 'poison':
            color = 'A040A0';
        case 'ground':
            color = 'E0C068';
        case 'flying':
            color = 'A890F0';
        case 'psychic':
            color = 'A65E9A';
        case 'bug':
            color = 'A8B820';
        case 'rock':
            color = 'B8A038';
        case 'ghost':
            color = '705898';
        case 'dark':
            color = '705848';
        case 'dragon':
            color = '7038F8';
        case 'steel':
            color = 'B8B8D0';
        case 'fairy':
            color = 'EE99AC';
        return color;
        // default:
        //     break;
    }
}