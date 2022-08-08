const getTypeData = require('./getTypeData')

module.exports = (types) => {
    const typeData = [];
    types.forEach(type => {
        typeData.push(getTypeData(type));
    });

    typeData.forEach(type => {
        console.log('type damage relations test:')
        console.log(type.damage_relations);
    });    
}