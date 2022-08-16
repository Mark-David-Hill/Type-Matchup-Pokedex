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
        weakToRowEl.display = ''
        let content = '';

        // 
        // x2 Section
        // 

        if (x2.length > 0) {
            content += `<div class="d-flex flex-row">`
            x2.forEach(type => {
                content += typeTemplate(type);
            });
            // add x2 text
            content += '<h4 id="x2" class="pt-2">x2&nbsp</h4>'
            content += `</div>`
        }

        // 
        // x4 Section
        // 

        if (x4.length > 0) {
            content += `<div class="d-flex flex-row">`
            x4.forEach(type => {
                content += typeTemplate(type);
            });
            // add x4 text
            content += '<h4 id="x4" class="pt-2">x4</h4>';
            content += `</div>`
        }
        
        weakToTypesEl.innerHTML = content;

    }
    else {
        weakToRowEl.display = 'none'
    }
}