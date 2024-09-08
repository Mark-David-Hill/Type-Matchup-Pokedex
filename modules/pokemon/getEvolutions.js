const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();
const getForms = require("./getForms");

module.exports = (id) => {
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

    return evolutions;
  });
};
