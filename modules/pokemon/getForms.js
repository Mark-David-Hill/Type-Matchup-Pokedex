const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

module.exports = async (pokemon) => {
    let forms = [];
    // console.log('pokemon::')
    // console.log(pokemon)
    formData = await P.getPokemonSpeciesByName(pokemon).then((response) => {
        response.varieties.forEach(pokeData => {
            let formName = pokeData.pokemon.name;
            // forms.push(formName);
            if (!formName.includes('totem')) {
                if (pokemon === 'pikachu') {
                    if (formName === 'pikachu' || formName === 'pikachu-gmax') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'eevee') {
                    if (formName !== 'eevee-starter') {
                        forms.push(formName);
                    }
                }
                // else if (pokemon === 'castform') {
                //     if (formName === 'castform') {
                //         forms.push(formName);
                //     }
                // }
                else if (pokemon === 'darmanitan') {
                    if (formName !== 'darmanitan-galar-zen') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'greninja') {
                    if (formName !== 'greninja-battle-bond') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'floette') {
                    if (formName !== 'floette-eternal') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'pumpkaboo') {
                    if (formName === 'pumpkaboo-average') {
                        // forms.push('pumpkaboo');
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'gourgeist') {
                    if (formName === 'gourgeist-average') {
                        // forms.push('gourgeist')
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'rockruff') {
                    if (formName !== 'rockruff-own-tempo') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'minior') {
                    if (formName === 'minior-red-meteor' || formName === 'minior-red') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'mimikyu') {
                    if (formName !== 'mimikyu-busted') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'magearna') {
                    if (formName !== 'magearna-original') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'cramorant') {
                    if (formName === 'cramorant') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'eternatus') {
                    if (formName !== 'eternatus-eternamax') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'zarude') {
                    if (formName !== 'zarude-dada') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'zygarde') {
                    if (formName !== 'zygarde-10' && formName !== 'zygarde-50-power-construct') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'miraidon') {
                    if (formName !== 'miraidon-low-power-mode' && formName !== 'miraidon-drive-mode' && formName !== 'miraidon-aquatic-mode' && formName !== 'miraidon-glide-mode') {
                        forms.push(formName);
                    }
                }
                else if (pokemon === 'koraidon') {
                    if (formName !== 'koraidon-limited-build' && formName !== 'koraidon-sprinting-build' && formName !== 'koraidon-swimming-build' && formName !== 'koraidon-gliding-build') {
                        forms.push(formName);
                    }
                }
                else {
                    forms.push(formName);
                }
            }
        });
    })    
    return forms;
}