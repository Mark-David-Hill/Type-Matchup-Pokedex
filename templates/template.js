let card = {
    title: "",
    desc: "", 
}

let techniques = [
    {
        "name":"Relane 1",
        "wisdom":1,
        "tp":4,
        "range":5,
        "cooldown":1,
        "description":"Restores your own HP or the HP of an ally by INTx1.",
        "damageStat":"INT",
        "damageMultiplier":1,
        "image":""
    },
    {
        "name":"Relane 2",
        "wisdom":2,
        "tp":10,
        "range":5,
        "cooldown":1,
        "description":"Restores your own HP or the HP of an ally by INTx2, or can heal all friendly heroes in range by INTx1.",
        "damageStat":"INT",
        "damageMultiplier":"1/2",
        "image":""
    },
    {
        "name":"Relane 3",
        "wisdom":3,
        "tp":20,
        "range":5,
        "cooldown":1,
        "description":"Restores your own HP or the HP of an ally by INTx3, or can heal all friendly heroes within a range of 5 by INTx1.",
        "damageStat":"INT",
        "damageMultiplier":"1/3",
        "image":""
    }
]

// Create Card Header
function makeHeader(title, subtitle) {
    content += `<!-- Name TP Row -->
    <div class="row tech-header">
      <div class="col">
        <h5 class="card-text py-2 text-start">
            ${title}
        </h5>
      </div>
      <div class="col">
        <p class="card-text text-end p-2">${subtitle} TP</p>
      </div>
    </div>`
    return content;
}

// Create Card Open


// Create Card Close

// Create Card
function makeCard(title, subTitle, img, desc, ) {
    content += `<div class="col-12 col-lg-6 my-3">
        <!-- ${title} Card -->
        <div class="card shadow">
          <div class="card-body py-0">
            <!-- Name TP Row -->
            <div class="row tech-header">
              <div class="col">
                <h5 class="card-text py-2 text-start">
                    ${title}
                </h5>
              </div>
              <div class="col">
                <p class="card-text text-end p-2">${subTitle} TP</p>
              </div>
            </div>
            <div class="row">
              <p class="p-3">${desc}</p>
            </div>
            <!-- Wisdom Range Cooldown Row -->
            <div class="row">
              <div class="col">
                <p class="fw-normal tech-footer p-2">Wisdom: ${tech.wisdom}</p>
              </div>
              <div class="col">
                <p class="fw-normal tech-footer p-2">Range: ${tech.range}</p>
              </div>
              
              ${cooldownText}

            </div>
          </div>
        </div> <!-- End Technique Card -->
      </div> <!-- End Column -->`
      return content;
}

function writeCards() {

}



// Display the techniques of the specified class
function displayTechniques(gameData, classIndex, elementIndex) {
    // Set for specific element index if Magician.
    if (classIndex === 2) {
        classTech = gameData.techniques[classIndex][elementIndex];
    }
    else {
        classTech = gameData.techniques[classIndex];
    }

    console.log('class tech: ');
    console.log(classTech);

    const charClass = capitalize(gameData.charClasses[classIndex]);
    const techModal = document.getElementById('techModal');
    content = "";

    const techTitle = document.getElementById('techTitle')

    let titleContent = `${charClass} Techniques`
    display(techTitle, titleContent)

    for (i = 0; i < classTech.length; i++) {
        let tech = classTech[i]
        let cooldownText = ''
        if(tech.cooldown) {
            cooldownText = `<div class="col">
                <p class="fw-normal tech-footer p-2">Cooldown: ${tech.cooldown}</p>
            </div>`;
            
        }
        content += `<div class="col-12 col-lg-6 my-3">
        <!-- ${tech.name} Card -->
        <div class="card shadow">
          <div class="card-body py-0">
            <!-- Name TP Row -->
            <div class="row tech-header">
              <div class="col">
                <h5 class="card-text py-2 text-start">
                    ${tech.name}
                </h5>
              </div>
              <div class="col">
                <p class="card-text text-end p-2">${tech.tp} TP</p>
              </div>
            </div>
            <div class="row">
              <p class="p-3">${classTech[i].description}</p>
            </div>
            <!-- Wisdom Range Cooldown Row -->
            <div class="row">
              <div class="col">
                <p class="fw-normal tech-footer p-2">Wisdom: ${tech.wisdom}</p>
              </div>
              <div class="col">
                <p class="fw-normal tech-footer p-2">Range: ${tech.range}</p>
              </div>
              
              ${cooldownText}

            </div>
          </div>
        </div> <!-- End Technique Card -->
      </div> <!-- End Column -->`
    }

    // Display generated content to the modal
    display(techModal, content);
}