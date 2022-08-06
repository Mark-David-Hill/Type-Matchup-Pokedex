module.exports = (allPokemon, searchBar) => {
  let searchStr = searchBar.value.toLowerCase();

  const checkSearch = (pokemon) => {
    return pokemon.name.includes(searchStr);
  }
  const filtered = allPokemon.filter(checkSearch);
  return filtered;
}

    
