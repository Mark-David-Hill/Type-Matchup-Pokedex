const typeTemplate = require('./typeTemplate');
const U = require("../util/util")

module.exports = (dmgProfile) => {
    const x2 = dmgProfile.x2;
    const x4 = dmgProfile.x4;

    const weakToTypesEl = U.getEl('weakToTypes');
    const weakToRowEl = U.getEl('weakToRow');
    const x2El = U.getEl('x2');
    const x4El = U.getEl('x4');

    // 
    // Weak To Section
    // 

    if (x2.length > 0 || x4.length > 0) {
        weakToRowEl.display = 'block'
        let content = '';
        // Content Body
        if (x4.length > 0) {
            x4El.display = 'block'
            x4.forEach(type => {
                const mod = 4;
                content += typeTemplate(type, mod);
            });
        }
        else {
            x4El.display = 'none'
        }
        if (x2.length > 0) {
            x2.display = 'block'
            x2.forEach(type => {
                const mod = 2;
                content += typeTemplate(type, mod);
            });
        }
        else {
            x2El.display = 'none'
        }

    }
    else {
        weakToRowEl.display = 'none'
    }
}