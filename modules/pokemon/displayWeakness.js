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


    // *****************To Do ****************
    // Get to display x2 and x4 only once using new styling for everything (and in the correct order)

    if (x2.length > 0 || x4.length > 0) {
        weakToRowEl.display = 'block'
        let content = '';

        // 
        // x2 Section
        // 

        if (x2.length > 0) {
            // x2.display = 'block'
            x2.forEach(type => {
                const mod = 2;
                content += typeTemplate(type, mod);
            });
            // add x2 text
            content += '<h4 id="x2" class="pt-2">x2&nbsp</h4>'
        }
        else {
            // x2El.display = 'none'
        }

        // 
        // x4 Section
        // 

        if (x4.length > 0) {
            // x4El.display = 'block'
            x4.forEach(type => {
                const mod = 4;
                content += typeTemplate(type, mod);
            });
            // add x4 text
            content += '<h4 id="x4" class="pt-2">x4</h4>';
        }
        else {
            // x4El.display = 'none'
        }
        
        weakToTypesEl.innerHTML = content;

    }
    else {
        weakToRowEl.display = 'none'
    }
}