const typeTemplate = require('./typeTemplate');

module.exports = (dmgProfile) => {
    const x0 = dmgProfile.x0;
    const immuneToTypesEl = document.getElementById('immuneToTypes');
    const immuneToRowEl = document.getElementById('immuneToRow');

    // 
    // Immune to Section
    // 

    if (x0.length > 0) {
        immuneToRowEl.style.display = ''
        immuneToRowEl.classList.add('d-flex')
        let content = '';
        
        x0.forEach(type => {
            content += typeTemplate(type);
        });
        // add x0 text
        content += '<h4 id="x0" class="pt-2">x0</h4>'
        
        immuneToTypesEl.innerHTML = content;

    }
    else {
        immuneToRowEl.style.display = 'none'
        immuneToRowEl.classList.remove('d-flex')
    }
}