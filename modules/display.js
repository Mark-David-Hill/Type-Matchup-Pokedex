// Display 
let display = function(target, ...contents) {
    let content = "";
    contents.forEach(el => {
        content += el;
    });
    target.innerHTML = content;
}

export default display;