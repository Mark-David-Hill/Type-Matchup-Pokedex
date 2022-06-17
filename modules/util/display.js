module.exports = (target, ...contents) => {
    let content = "";
    // Add all items included in contents array
    for (let item of contents) {
        content += item;
    }
    // Display content to target element
    target.innerHTML = content;
}