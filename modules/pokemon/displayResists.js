const typeTemplate = require('./typeTemplate');
const U = require("../util/util")

module.exports = (dmgProfile) => {
    const x1fourth = dmgProfile.x1fourth;
    const x1half = dmgProfile.x1half;

    const resistsTypesEl = U.getEl('resistsTypes');
    const resistsRowEl = U.getEl('resistsRow');

    // 
    // Resists Section
    // 

    if (x1fourth.length > 0 || x1half.length > 0) {
        console.log('display test:')
        console.log(resistsRowEl.style.display)
        resistsRowEl.style.display = ''
        let content = '';

        // 
        // x1/4 Section
        // 

        if (x1fourth.length > 0) {
            // x1fourth.display = 'block'
            x1fourth.forEach(type => {
                content += typeTemplate(type);
            });
            // add x2 text
            content += '<h4 id="x1fourth" class="pt-2">x¼&nbsp</h4>'
        }

        // 
        // x4 Section
        // 

        if (x1half.length > 0) {
            // x1halfEl.display = 'block'
            x1half.forEach(type => {
                content += typeTemplate(type);
            });
            // add x1half text
            content += '<h4 id="x1half" class="pt-2">x½</h4>';
        }
        
        resistsTypesEl.innerHTML = content;

    }
    else {
        console.log('hide resists row')
        resistsRowEl.style.display = 'none'
    }
}