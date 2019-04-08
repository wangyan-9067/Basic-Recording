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
            if (err) {
                reject(err);
            } else {
                let src = files[0];
                let dest = path.resolve('/root/public', 'e-telebet', `${filename}.aac`);

                console.log(`find src file ${src}, files length ${files.length}`);
                console.log(`copy to dest ${dest}`);

                fs.copyFile(src, dest)
                    .then(function() {
                        return fs.remove(storagePath).then(resolve);
                    })
                    .catch(reject);
                }
        });
    });
}

module.exports = {
    moveFile
}
