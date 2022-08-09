const typeTemplate = require('./typeTemplate');

module.exports = (dmgProfile) => {
    console.log('dmgProfile:')
    console.log(dmgProfile);
    const x0 = dmgProfile.x0;
    const x1fourth = dmgProfile.x1fourth;
    const x1half = dmgProfile.x1half;
    const x2 = dmgProfile.x2;
    const x4 = dmgProfile.x4;

    let content = '';

    // 
    // Weak To Section
    // 

    if (x2 || x4) {
        // Content Open
        content += `<div class="d-flex flex-column justify-content-center align-items-center">
                        <div class="flex-column">
                            <p>Weak To:</p>
                        </div>
                        <div class="flex-column">
                            <ul class="text-center align-middle pt-4">`

        // Content Body
        if (x4) {
            x4.forEach(type => {
                const mod = 4;
                content += typeTemplate(type, mod);
            });
        }
        if (x2) {
            x2.forEach(type => {
                const mod = 2;
                content += typeTemplate(type, mod);
            });
        }
    
        // Content Close
        content += `        </ul>
                        </div>
                    </div>`                
    }

    // 
    // Resistant To Section
    //

    if (x1half || x1fourth) {
        // Content Open
        content += `<div class="d-flex flex-column justify-content-center align-items-center">
                        <div class="flex-column">
                            <p>Weak To:</p>
                        </div>
                        <div class="flex-column">
                            <ul class="text-center align-middle pt-4">`

        // Content Body
        if (x1half) {
            x1half.forEach(type => {
                const mod = 0.5;
                content += typeTemplate(type, mod);
            });
        }
        if (x1fourth) {
            x1fourth.forEach(type => {
                const mod = 0.25;
                content += typeTemplate(type, mod);
            });
        }
    
        // Content Close
        content += `        </ul>
                        </div>
                    </div>`                
    }


    return content;
    // content += `
    //             <div class="row">
    //                 <p>Resistant To:</p>
    //             </div>
    //             <div class="row">
    //                 <p>Immune To:</p>
    //             </div>`
    
    
    // content += `<li class="rounded text-center ${type} p-1 m-1">${type}</li>`;
}