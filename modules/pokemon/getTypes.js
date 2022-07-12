module.exports = (pokemon) => {
    let typesData = pokemon.types;
    let types = [];
    typesData.forEach(element => {
      let currentType = element.type.name;
      types.push(currentType)
    });
    console.log("Pokemon's types:")
    console.log(types);
    return types;
}