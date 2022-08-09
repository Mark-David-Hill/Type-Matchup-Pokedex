module.exports = (type, mod) => {
    let content = '';
    if (mod) {
        let modifier = null;
        switch (mod) {
            case 4:
                modifier = 'x4'
                break;
            case 2:
                modifier = 'x2'
                break;
            case 0.5:
                modifier = 'x½'
                break;
            case 0.25:
                modifier = 'x¼'
                break;
            case 0:
                modifier = 'x0'
                break;
        }
        content += `<li class="rounded text-center ${type} p-1 m-1">${type}</li><span>${modifier}</span>`
    }
    else {
        content += `<li class="rounded text-center ${type} p-1 m-1">${type}</li>`
    }
    return content;
}