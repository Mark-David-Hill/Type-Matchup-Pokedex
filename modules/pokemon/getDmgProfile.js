const getDmgRel = require("./getDmgRel");

module.exports = (type1, type2, allTypesData) => {
    // ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy']
    
    // Convert raw type dmg relationships to lists of type names
    getTypeNames = (typeDmgRel) => {
        typeNames = typeDmgRel.map((type) => {
            const typeName = type.name;
            return typeName;
        })
        return typeNames;
    }

    // 
    // Get damage relations for specified types
    // 

    // Type 1 data
    
    const type1DmgRelRaw = getDmgRel(type1, allTypesData)
    const type1DmgRel = {}

    const type1x2 = type1DmgRelRaw.damage_relations.double_damage_from;
    const type1x1half = type1DmgRelRaw.damage_relations.half_damage_from;
    const type1x0 = type1DmgRelRaw.damage_relations.no_damage_from;

    type1DmgRel.x2 = getTypeNames(type1x2);
    type1DmgRel.x1half = getTypeNames(type1x1half);
    type1DmgRel.x0 = getTypeNames(type1x0);

    // console.log(`${type1} dmg relationships:`)
    // console.log(type1DmgRel);

    // Type 2 data

    let type2DmgRel = null;
    if (type2) {
        // Type 2 data
    
        const type2DmgRelRaw = getDmgRel(type2, allTypesData)
        type2DmgRel = {}

        const type2x2 = type2DmgRelRaw.damage_relations.double_damage_from;
        const type2x1half = type2DmgRelRaw.damage_relations.half_damage_from;
        const type2x0 = type2DmgRelRaw.damage_relations.no_damage_from;

        type2DmgRel.x2 = getTypeNames(type2x2);
        type2DmgRel.x1half = getTypeNames(type2x1half);
        type2DmgRel.x0 = getTypeNames(type2x0);

        // console.log(`${type2} dmg relationships:`)
        // console.log(type2DmgRel);
    }

    // type1DmgRel, type2DmgRel
    
    // 
    // Set up Defense Damage Relationship profile based on the relationships for the 2 types
    // 

    let typeRel = {
        normal: 1,
        fire: 1,
        water: 1,
        grass: 1,
        electric: 1,
        ice: 1,
        fighting: 1,
        poison: 1,
        ground: 1,
        flying: 1,
        psychic: 1,
        bug: 1,
        rock: 1,
        ghost: 1,
        dark: 1,
        dragon: 1,
        steel: 1,
        fairy: 1
    }

    // Type 1 Modifiers

    type1DmgRel.x2.forEach(type => {
        if (typeRel[`${type}`]) {
            typeRel[`${type}`] *= 2;
        }
    });

    type1DmgRel.x1half.forEach(type => {
        if (typeRel[`${type}`]) {
            typeRel[`${type}`] *= 0.5;
        }
    });

    type1DmgRel.x0.forEach(type => {
        if (typeRel[`${type}`]) {
            typeRel[`${type}`] *= 0;
        }
    });

    // Type 2 Modifiers:

    if (type2DmgRel) {
        type2DmgRel.x2.forEach(type => {
            if (typeRel[`${type}`]) {
                typeRel[`${type}`] *= 2;
            }
        });
    
        type2DmgRel.x1half.forEach(type => {
            if (typeRel[`${type}`]) {
                typeRel[`${type}`] *= 0.5;
            }
        });
    
        type2DmgRel.x0.forEach(type => {
            if (typeRel[`${type}`]) {
                typeRel[`${type}`] *= 0;
            }
        });
    }
    
    // console.log('Type Rel Test')
    // console.log(typeRel);

    const defDmgRel = {
        x0: [],
        x1fourth: [],
        x1half: [],
        x2: [],
        x4: []
    }

    for (const key in typeRel) {
        switch (typeRel[`${key}`]) {
            case 0:
                defDmgRel.x0.push(key);
                break;
            case 0.25:
                defDmgRel.x1fourth.push(key);
                break;
            case 0.5:
                defDmgRel.x1half.push(key);
                break;
            case 2:
                defDmgRel.x2.push(key);
                break;
            case 4:
                defDmgRel.x4.push(key);
                break;
        }
    }

    // console.log('def damage rel test')
    // console.log(defDmgRel);

    return defDmgRel;
}