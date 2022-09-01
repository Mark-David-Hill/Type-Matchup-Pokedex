const U = require('../util/util');

module.exports = (type) => {
    let cType = U.capitalize(type);
    return `<li class="shadow type rounded text-center ${type} p-1 m-1">${cType}</li>`
}
