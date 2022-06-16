// import { getData, capitalize, display, getEl} from './modules/util.js'
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()
// console.log(P);

// with await, be sure to be in an async function (and in a try/catch)
// (async () => {
//     const golduck = await P.getPokemonByName("golduck")
//     console.log(golduck)
//   })()


// or with Promises
P.getPokemonByName("eevee")
  .then(function(response) {
    console.log(response)
  })



// getLocal -> getJSON -> onLoad -> displayData

// // 
// // Retrieve Local Storage
// // 

// window.addEventListener("DOMContentLoaded", function(e) {
//     // let charName = localStorage.getItem("characterName");
//     // let charClass = localStorage.getItem("characterClass");
//     // let charRace = localStorage.getItem("characterRace");
//     // let charElement = localStorage.getItem("characterElement");

//     // let charChoices = [charName, charClass, charRace, charElement];

//     let localData = '';

//     // Begins the process of requesting the JSON data.
//     getData('data.json', onLoad, localData)
// })

// getData('data.json', onLoad);

// // 
// // On Load
// // 

// function onLoad(data, localData) {
//     // displayCards(data);
//     displayData(data);
// }

// // 
// // Display Data
// // 

// function displayData(data) {
//     const target = getEl('test');
//     let charClasses = data.charClasses;

//     let content = '';
//     // Content Open
//     content += `<div class="album py-5 bg-light">
//                     <div class="row">`

//     // Class Cards
//     for (let i = 0; i < charClasses.length; i++) {
//         const curClass = charClasses[i];
//         const reqStats = curClass.reqStats;
//         const statGains = curClass.statGains;
//         const name = capitalize(curClass.name);
//         let image;
//         if (curClass.images[0]) {
//             image = curClass.images[0];
//         }
//         else {
//             image = curClass.images[1];
//         }
        
//         content += `<div class="col-6 col-sm-3 col-md-2">
//                         <div class="card">
//                             <div class="row">
//                                 <img src="${image}" class="img-fluid" alt="..."></img>
//                                 <h3>${name}</h3>
//                                 <p>Required Stats: ${reqStats}
//                                 <p>Required Stats: ${statGains}
//                             </div>
//                         </div>
//                     </div>`;
//     }

//     // Content Close
//     content += `</div>
//                     </div>`

//     // Display Content
//     display(target, content);
// }