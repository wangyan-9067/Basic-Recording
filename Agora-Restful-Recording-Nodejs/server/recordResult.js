const glob = require("glob");
const path = require("path");
fs = require('fs-extra');

/**
 *
 * @param {string} sid
 * @param {string} filename
 *
 * @returns Promise
 */
function moveFile(sid, filename) {
    return new Promise(function(resolve, reject) {
        const storagePath = path.resolve(__dirname, `./output/${sid}`);
        glob(`${storagePath}/*.aac`, function(err, files) {
            fs.copy(files[0], path.resolve('/public', 'e-telebet', `${filename}.aac`))
                .then(function() {
                    return fs.remove(storagePath).then(resolve);
                })
                .catch(reject);
        });
    });
}

module.exports = {
    moveFile
}