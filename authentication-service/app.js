const express = require('express');
const cors = require('cors');
const jwt = require('shared/jwt.js');
const mongo = require("shared/mongo-connection.js");
const authRepo = require("./auth-repository.js");

const PORT = process.env.AUTHENTICATION_SERVICE_PORT;

const app = express();
app.use(cors());

app.get('/ping', (req, res) => {
    res.send("pong");
});

const parseUserCreds = (req, res, next) => {
    const base64Creds = req.get('Authorization');
    if (!base64Creds) {
        return res
            .status(401)
            .json({ msg: "Missing 'Authorization' header." });
    }

    const decodedCreds = Buffer.from(base64Creds, 'base64').toString('ascii');

    try {
        const { login, password } = JSON.parse(decodedCreds);
        if (!login || !password) {
            throw new Error();
        }
        req.userCreds = { login, password };
        return next();
    } catch (err) {
        return res
            .status(401)
            .json({ msg: "Provided credentials don't follow the expected pattern." });
    }
}

app.get('/authenticate', parseUserCreds, (req, res) => {
    const creds = req.userCreds;
    authRepo
        .findUserByCredentials(creds)
        .then(payload => {
            if (!payload) {
                return res
                    .status(401)
                    .json({ msg: "Incorrect login or password." });
            }
            const token = jwt.sign(payload);
            return res.json({ token });
        })
        .catch(err => {
            return res
                .status(500)
                .json({ msg: "Something went wrong.", err });
        });
});

app.listen(PORT, () => {
    console.log(`authentication-service is running at ${PORT}.`);
});

process.on('SIGINT', () => {
    mongo.close();
    process.exit();
});
