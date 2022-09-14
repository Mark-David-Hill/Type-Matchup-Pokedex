const getTypeId = require("./getTypeId");
const getTypePokemon = require("./getTypePokemon");

module.exports = (type1El, type2El, allTypesData, filteredList, singleTypedPokemon) => {
    let result = null;
    const type1 = type1El.value;
    const type2 = type2El.value;

    if (type1 !== "none" || (type2 !== "none") && type2 !== "noType") {
        let type1Pokemon = null;
        let type2Pokemon = null;
        let typePokemon = null;
        // Type1
        if (type1 !== "none") {
            const type1Id = getTypeId(type1);
            // Set type1 selection style
            type1El.classList.add('type')
            type1El.classList.add(type1)
    
            const type1Data = allTypesData[type1Id];
            type1Pokemon = getTypePokemon(type1Data);
        }
        // Type2
        if (type2 !== "none" && type2 !== "noType") {
            const type2Id = getTypeId(type2);
            // Set type1 selection style
            type2El.classList.add('type')
            type2El.classList.add(type2)
    
            const type2Data = allTypesData[type2Id];
            type2Pokemon = getTypePokemon(type2Data);
        }
        
        if (type1Pokemon && type2Pokemon) {
            typePokemon = [];
            type1Pokemon.forEach(pokemon => {
            if (type2Pokemon.includes(pokemon)) {
                typePokemon.push(pokemon);
            }
            });
        }
        else if (type1Pokemon) {
            // If the Pokemon is single-typed
            if (type2El.value === 'noType') {
            const isSingleTyped = (pokemon) => {
                let result = false;
                singleTypedPokemon.forEach(stp => {
                if (stp === pokemon) {
                    result = true;
                }
                });
                // result = singleTypedPokemon.includes(pokemon);
                return result;
            }
    
            typePokemon = type1Pokemon.filter(isSingleTyped);
            }
            // The Pokemon can have 1 or 2 types
            else {
            typePokemon = type1Pokemon;
            }
        }
        else if (type2Pokemon) {
            typePokemon = type2Pokemon;
        }
    
        // Filter Search filtered list of Pokemon based on if they have the specified types
    
        const checkTypePokemon = (pokemonToCheck) => {
            let includePokemon = false;
            typePokemon.forEach(tp => {
            if (pokemonToCheck.name === tp) {
                includePokemon = true;
            }
            });
            return includePokemon;
        }
    
        const typeFiltered = filteredList.filter(checkTypePokemon);
        result = typeFiltered;
        }
        // If no types are selected, just use search string filtered list
        else {
        result = filteredList;
        }
        return result;
}
