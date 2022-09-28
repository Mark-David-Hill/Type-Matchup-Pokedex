const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async (evolutions, currPoke) => {
    let forms = [];
    // console.log('name test:')
    // console.log(pokemon)
    evolutions.forEach(evo => {
        let formData = await P.getPokemonSpeciesByName(pokemon);
        forms.push(evo)
    });
            response.varieties.forEach(pokeData => {
                forms.push(pokeData.pokemon.name);
            });
            // response.varieties[0].pokemon.name
            // console.log('forms:');
            // console.log(forms);
            const pokeSelectEl = document.getElementById('pokeSelect');
    
            let content = '';
                
            forms.forEach(form => {
                const cName = U.capitalize(form); 
                if (form === currPoke) {
                    content += `<option id="option1" value="${form}" selected>${cName}</option>`
                }
                else {
                    content += `<option value="${form}">${cName}</option>`
                }
            });
    
            pokeSelectEl.innerHTML = content;
    
            return forms;
}