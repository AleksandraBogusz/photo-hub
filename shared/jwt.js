const _jwt = require('jsonwebtoken');
const _BEARER = "Bearer ";

// TODO: when imported into REACT app, the following var cannot be read,
// this is why we are using the hardcoded '???' value here, 
// remove the value and readt the secret only from env var
const _SECRET = process.env.JWT_SECRET || '???';

const sign = (payload) => _jwt.sign(payload, _SECRET, { expiresIn: '1h' });
const verify = (token) => {
    try {
        return _jwt.verify(token, _SECRET);
    } catch (err) {
        return null;
    }
}

const middleware = (req, res, next) => {
    const value = req.get('Authorization');
    if (!value) {
        return res
            .status(403)
            .json({ msg: "Missing 'Authorization' header." });
    }

    if (!value.startsWith(_BEARER)) {
        return res
            .status(403)
            .json({ msg: "Unexpected 'Authorization' value format." });
    }

    const token = value.split(_BEARER)[1];
    if (!token) {
        return res
            .status(403)
            .json({ msg: "Malformed 'Authorization' value." });

    }

    const payload = verify(token);
    if (!payload) {
        return res
            .status(403)
            .json({ msg: "Invalid token." });
    }

    next();
}

module.exports = {
    sign,
    verify,
    middleware
}