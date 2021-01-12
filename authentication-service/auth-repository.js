const mongo = require('shared/mongopool.js');

const _COLLECTION = 'users';
const findUserByCredentials = (creds) => {
    return new Promise((resolve, reject) => {
        const cb = (err, user) => {
            if (err) { reject(err); }
            resolve(user);
        }
        mongo
            .collection(_COLLECTION)
            .then(col => col.findOne(creds, cb))
            .catch(err => reject(err))
    });
}

module.exports = {
    findUserByCredentials
}