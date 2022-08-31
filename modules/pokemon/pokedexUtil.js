const getPokemon = require('./getPokemon');
const getAllPokemon = require('./getAllPokemon');
const makePokeArray = require('./makePokeArray');
const displayPokemon = require('./displayPokemon');
const displayAllPokemon = require('./displayAllPokemon');
const getTypeData = require('./getTypeData');
const getTypes = require('./getTypes');
const pokeSearch = require('./pokeSearch');
const makeFiltCont = require('./makeFiltCont');
const makePokeCont = require('./makePokeCont');
const getTypeId = require('./getTypeId');
const getTypePokemon = require('./getTypePokemon');
const getSingleTyped = require('./getSingleTyped');

module.exports = {
    getPokemon: getPokemon,
    getAllPokemon: getAllPokemon,
    makePokeArray: makePokeArray,
    displayPokemon: displayPokemon,
    displayAllPokemon: displayAllPokemon,
    getTypeData: getTypeData,
    getTypes: getTypes,
    pokeSearch: pokeSearch,
    makeFiltCont: makeFiltCont,
    makePokeCont: makePokeCont,
    getTypeId: getTypeId,
    getTypePokemon: getTypePokemon,
    getSingleTyped: getSingleTyped
};