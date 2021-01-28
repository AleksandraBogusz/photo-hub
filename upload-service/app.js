const express = require('express');
const cors = require('cors');
const multer = require('multer');

const upload = multer();

const PORT = process.env.UPLOAD_SERVICE_PORT;

const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
    res.json({ msg: 'pong' });
});

app.post('/upload', upload.single('super-file'), (req, res) => {
    console.log(req.file);
    res.json({ msg: "ok" });
});

app.listen(PORT, () => {
    console.log(`Upload Service is listening on ${PORT}.`);
});

process.on('SIGINT', () => {
    process.exit();
});