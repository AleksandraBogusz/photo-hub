const mongo = require('shared/mongo-connection.js');

const _COLLECTION = 'users';
const findUserByCredentials = (creds) => {
    return new Promise((resolve, reject) => {
        const cb = (err, user) => {
            if (err) { reject(err); }
            if (!user) { return resolve(null); }
            const {displayName, role} = user;
            resolve({displayName, role});
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