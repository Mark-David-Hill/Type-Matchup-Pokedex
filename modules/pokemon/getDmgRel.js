const getTypeId = require("./getTypeId");

module.exports = (type, allTypesData) => {
    typeId = getTypeId(type);

    typeData = allTypesData[typeId]
    dmgRel = {
        weakTo: [],
        resists: [],
        immuneTo: []
    }
    
    return typeData;
}