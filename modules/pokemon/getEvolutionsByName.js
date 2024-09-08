const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();
const getForms = require("./getForms");
const U = require("../util/util");

module.exports = async (pokeName) => {
  let name = pokeName;
  let species = "";
  try {
    P.getPokemonByName(pokeName).then((response) => {
      let pokemon = response;
      species = pokemon.species.name;
      P.getPokemonSpeciesByName(species).then(function (response) {
        const evoData = response.evolution_chain.url;
        let id = evoData.substring(26);
        id = id.replace(/\D/g, "");
        const evoChain = P.getEvolutionChainById(id).then((response) => {
          let evolutions = [];

          let form1 = response.chain.species.name;
          let forms2 = null;
          let forms3 = null;

          if (response.chain.evolves_to[0]) {
            forms2 = [];
            response.chain.evolves_to.forEach((form) => {
              forms2.push(form.species.name);
            });
          }

          if (forms2 && response.chain.evolves_to[0].evolves_to[0]) {
            forms3 = [];
            response.chain.evolves_to.forEach((form2) => {
              form2.evolves_to.forEach((form3) => {
                forms3.push(form3.species.name);
              });
            });
          }

          evolutions.push(form1);
          if (forms2 && forms2.length > 0) {
            forms2.forEach((form) => {
              evolutions.push(form);
            });
          }
          if (forms3 && forms3.length > 0) {
            forms3.forEach((form) => {
              evolutions.push(form);
            });
          }

          evolutions.forEach((evo) => {
            const cName = evo;
            U.capitalize(evo);
            if (evo === pokeName) {
              content += `<option id="option1" value="${evo}" selected>${cName}</option>`;
            } else {
              content += `<option value="${evo}">${cName}</option>`;
            }
          });

          const getAllTypesData = async () => {
            try {
              let promises = [];
              for (let i = 0; i < types.length; i++) {
                promises.push(P.getTypeByName(types[i]));
              }

              await Promise.all(promises).then((results) => {
                allTypesData = results;
                localStorage.setItem(
                  "allTypesData",
                  JSON.stringify(allTypesData)
                );
                search();
                singleTypedPokemon = PD.getSingleTyped(allTypesData);
              });
            } catch (e) {
              console.error(e, "error when retrieving type data");
            }
          };

          const getAllForms = async (evolutions) => {
            try {
              let promises = [];
              for (let i = 0; i < evolutions.length; i++) {
                promises.push(getForms(evolutions[i]));
              }

              await Promise.all(promises).then((results) => {
                allForms = results;

                const pokeSelectEl = document.getElementById("pokeSelect");
                const leftBtn = document.getElementById("leftArrow");
                const rightBtn = document.getElementById("rightArrow");
                const prevPokemonEl = document.getElementById("prevPokemon");
                const nextPokemonEl = document.getElementById("nextPokemon");

                let content = "";

                let forms = [];
                for (let i = 0; i < allForms.length; i++) {
                  let evo = allForms[i];
                  evo.forEach((form) => {
                    forms.push(form);
                  });
                }

                const numForms = forms.length;
                let formId = 0;

                for (let i = 0; i < forms.length; i++) {
                  const form = forms[i];
                  const cName = form.replace(/(^|[\s-])\S/g, function (match) {
                    return match.toUpperCase();
                  });
                  if (form === pokeName) {
                    content += `<option id="option1" value="${form}" selected>${cName}</option>`;
                    formId = i;
                  } else {
                    content += `<option value="${form}">${cName}</option>`;
                  }
                }

                pokeSelectEl.innerHTML = content;

                if (formId === 0) {
                  leftBtn.setAttribute("disabled", "disabled");
                  prevPokemonEl.innerText = "";
                } else {
                  leftBtn.removeAttribute("disabled");
                  const prevForm = forms[`${formId - 1}`].replace(
                    /(^|[\s-])\S/g,
                    function (match) {
                      return match.toUpperCase();
                    }
                  );
                  prevPokemonEl.innerText = prevForm;
                }

                if (formId + 1 === forms.length) {
                  rightBtn.setAttribute("disabled", "disabled");
                  nextPokemonEl.innerText = "";
                } else {
                  rightBtn.removeAttribute("disabled");
                  const nextForm = forms[`${formId + 1}`].replace(
                    /(^|[\s-])\S/g,
                    function (match) {
                      return match.toUpperCase();
                    }
                  );
                  nextPokemonEl.innerText = nextForm;
                }
              });
            } catch (e) {
              console.error(e, "could not retrieve pokemon forms data");
            }
          };

          getAllForms(evolutions);

          const pokeSelectEl = document.getElementById("pokeSelect");
          pokeSelectEl.innerHTML = content;

          return evolutions;
        });
      });
    });
  } catch (e) {
    console.error(e, "failed to load data from pokemon api");
  }
};
