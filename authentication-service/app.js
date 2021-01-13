const express = require('express');
const jwt = require('jsonwebtoken');
const mongo = require("shared/mongopool.js");
const authRepo = require("./auth-repository.js");

const PORT = process.env.PORT
const SECRET = process.env.JWT_SECRET;

const app = express();

const response = (res, status, msg) => res.status(status).json(msg);

app.get('/ping', (req, res) => {
    res.send("pong");
});

const parseUserCreds = (req, res, next) => {
    const base64Creds = req.get('Authorization');
    if (!base64Creds) {
        return response(res, 401, {msg: "Missing Authorization header."});
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
        return response(res, 401, {msg: "Provided credentials don't follow the expected pattern."});
    }
}

app.get('/authenticate', parseUserCreds, (req, res) => {
    const creds = req.userCreds;

    authRepo
        .findUserByCredentials(creds)
        .then(payload => {
            if (!payload) {
                return response(res, 401, {msg: "Incorrect login or password."});
            }
            const token = jwt.sign(payload, SECRET, {expiresIn: '1h'});
            response(res, 200, {token});
        })
        .catch(err => {
            response(res, 500, {msg: "Something went wrong.", err});
        });
});

app.listen(PORT, () => {
    console.log(`Token-generator-service is running at ${PORT}.`);
});

process.on('SIGINT', () => {
    mongo.close();
    process.exit();
});
