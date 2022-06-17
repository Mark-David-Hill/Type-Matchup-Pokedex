module.exports = function(target, ...contents) {
    let content = "";
    contents.forEach(el => {
        content += el;
    });
    target.innerHTML = content;
}