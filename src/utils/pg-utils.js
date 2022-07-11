const fs = require('fs');
const path = require('path');

const readQueryFromFile = (dirname, relative_path) => {
    return fs.readFileSync(path.join(dirname, relative_path), 'utf8').toString();
}


module.exports = {
    readQueryFromFile
}