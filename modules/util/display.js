module.exports = (target, ...contents) => {
  let content = "";
  for (let item of contents) {
    content += item;
  }
  target.innerHTML = content;
};
