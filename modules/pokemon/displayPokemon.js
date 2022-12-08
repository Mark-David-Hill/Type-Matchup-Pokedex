const display = require("../util/display")

module.exports = async (pokemon) => {
    const name = capitalize(pokemon.name);
    let typesData = pokemon.types;
    let types = [];
    typesData.forEach(element => {
    let currentType = element.type.name;
    types.push(currentType)
    });
    const image = pokemon.sprites.front_default

    let content = '';
    content += `<image src="${image}">`
    content += `<p>Name: ${name}</p>`
    
    content += `<p>Type: ${types}</p>`
    
    content += `<p>Weak Against: </p>`
    
    content += `<p>Strong Against: </p>`
    
    display(root, content);

    console.log(pokemon);
    
    console.log(types);
    return types;
}