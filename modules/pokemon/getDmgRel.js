const getTypeId = require("./getTypeId");

module.exports = (type, allTypesData) => {
    typeId = getTypeId(type);

    typeData = allTypesData[typeId]
    console.log('this type"s data:')
    console.log(typeData);
    return typeData;
}