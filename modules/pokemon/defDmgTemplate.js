const typeTemplate = require('./typeTemplate');

module.exports = (dmgProfile) => {
    // console.log('dmgProfile:')
    // console.log(dmgProfile);
    const x0 = dmgProfile.x0;
    const x1fourth = dmgProfile.x1fourth;
    const x1half = dmgProfile.x1half;
    const x2 = dmgProfile.x2;
    const x4 = dmgProfile.x4;

    let content = '';

    // 
    // Weak To Section
    // 

    if (x2.length > 0 || x4.length > 0) {
        // Content Open
        content += `<div class="row">
                        <div class="col">
                            <p>Weak To:</p>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-row">`

        // Content Body
        if (x4.length > 0) {
            x4.forEach(type => {
                const mod = 4;
                content += typeTemplate(type, mod);
            });
        }
        if (x2.length > 0) {
            x2.forEach(type => {
                const mod = 2;
                content += typeTemplate(type, mod);
            });
        }
    
        // Content Close
        content += `        
                        </div>
                    </div>
                </div>`                
    }

    // 
    // Resistant To Section
    //

    if (x1half.length > 0 || x1fourth.length > 0) {
        // Content Open
        content += `<div class="row">
                        <div class="col">
                            <p>Resistant To:</p>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-row">`

        // Content Body
        if (x1half.length > 0) {
            x1half.forEach(type => {
                const mod = 0.5;
                content += typeTemplate(type, mod);
            });
        }
        if (x1fourth.length > 0) {
            x1fourth.forEach(type => {
                const mod = 0.25;
                content += typeTemplate(type, mod);
            });
        }
    
        // Content Close
        content += `        
                        </div>
                    </div>
                </div>`                
    }

    // 
    // Immune To Section
    //

    if (x0.length > 0) {
        // Content Open
        content += `<div class="row">
                        <div class="col">
                            <p>Immune To:</p>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-row">`

        // Content Body
        x0.forEach(type => {
            const mod = 0;
            content += typeTemplate(type, mod);
        });
    
        // Content Close
        content += `        
                        </div>
                    </div>
                </div>`                
    }

    return content;
}