const express = require('express');

const PORT = process.env.UPLOAD_SERVICE_PORT;

const app = express();

app.get('/ping', (req, res) => {
    res.json({ msg: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Upload Service is listening on ${PORT}.`);
});

process.on('SIGINT', () => {
    process.exit();
});