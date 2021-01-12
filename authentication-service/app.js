const express = require('express');
const jwt = require('jsonwebtoken');
const mongo = require("shared/mongopool.js");

const PORT = process.env.PORT

const app = express();

app.get('/ping', (req, res) => {

    mongo.collection('users')
        .then(coll => {
            coll.find().toArray((err, docs) => {
                if (err) { throw err };
                console.log(docs);
            });
        })
        .catch(err => {
            console.log(err);
        })
    res.json({msg: "pong"});
});

const parseUserCreds = (req, res, next) => {
    const base64Creds = req.get('Authorization');
    if (!base64Creds) {
        return res
            .status(401)
            .json({msg: "Missing Authotization header"});
    }

    const decodedCreds = Buffer.from(base64Creds, 'base64').toString('ascii');

    try {
        const {login, password} = JSON.parse(decodedCreds);
        if (!login || !password) {
            throw new Error();
        }
        req.userCreds = {login, password};
        return next();
    } catch (err) {
        return res
            .status(401)
            .json({msg: "Provided credentials don't follow the expected pattern."});
    }
}

app.get('/authenticate', parseUserCreds, (req, res) => {
    const creds = req.userCreds;
    console.log(creds);
    res.send("ok");
});

app.listen(PORT, () => {
    console.log(`Token-generator-service is running at ${PORT}.`);
});

process.on('SIGINT', () => {
    mongo.close();
    process.exit();
});
