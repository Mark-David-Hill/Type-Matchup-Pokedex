const getDmgRel = require("./getDmgRel");

module.exports = (type1, type2, allTypesData) => {
    const type1DmgRel = getDmgRel(type1, allTypesData)
    const type2DmgRel = getDmgRel(type2, allTypesData)

    let type1x2 = type1DmgRel.damage_relations.double_damage_from;
    let type1x1half = type1DmgRel.damage_relations.half_damage_from;
    let type1x0 = type1DmgRel.damage_relations.no_damage_from;

    getTypeNames = (type) => {
        typeName = type.name;
        return typeName;
    }

    if (type1x2) {
        type1x2 = type1x2.map(getTypeNames);
    }
    if (type1x1half) {
        type1x1half = type1x1half.map(getTypeNames);
    }
    if (type1x0) {
        type1x0 = type1x0.map(getTypeNames);
    }

    

    // let type2x2 = type2DmgRel.damage_relations.double_damage_from;
    // let type2x1half = type2DmgRel.damage_relations.half_damage_from;
    // let type2x0 = type2DmgRel.no_damage_from;

    console.log(`${type1} is weak to:`)
    console.log(type1x2);
    console.log(`${type1} resists:`)
    console.log(type1x1half);
    console.log(`${type1} is immune to:`)
    console.log(type1x0);

    defDmgRel = {
        x0: [],
        x1fourth: [],
        x1half: [],
        x1: ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'],
        x2: [],
        x4: []
    }
    
    
    // x2
    // .damage_relations.double_damage_from;
    // x1/2
    // .damage_relations.half_damage_from;
    // x0
    // .damage_relations.no_damage_from;


    
    return defDmgRel;
}

// Weak to:
//      dmgx2
//      dmgx4
// Resists:
//      dmgx1/2
// Immune:
//      dmgx0

// Gyarados- water and air. from Electric:
// if (dmgx2 && dmgx2) {
//      dmgx4
// }


// if (dmgx2 && dmgx1/2) {
    
// }

// if (dmgx2 && dmgx0) {

// }

// if (dmgx1/2 && dmgx1/2) {

// }

// if (dmgx1/2 && dmgx0) {

// }

// if (dmgx0 && dmgx0) {

// }