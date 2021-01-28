const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;
const poolSize = process.env.MONGODB_POOL_SIZE;

const options = {
    poolSize,
    useUnifiedTopology: true,
};

var _client = null;
const connection = () => {
    return new Promise((resolve, reject) => {
        if (_client) { return resolve(_client); }

        MongoClient.connect(url, options, (err, client) => {
            if (err) { return reject(err); }
            _client = client;

            console.log(`Connected to mongodb at ${url}`);
            return resolve(_client);
        });
    });
}

const collection = (name) => {
    return new Promise((resolve, reject) => {
        connection()
            .then(client => resolve(client.db(db).collection(name)))
            .catch(err => reject(err));
    });
}

const close = () => {
    if (_client) {
        _client.close();
        console.log(`The mongodb connection has been closed.`);
    }
    _client = null;
}

module.exports = {
    connection,
    collection,
    close
}