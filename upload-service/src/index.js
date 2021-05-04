const uploadRoute = require('./routes/upload');
const express = require('express');

const PORT = process.env.UPLOAD_SERVICE_PORT;

const app = express();

app.use('/upload', uploadRoute);

app.get('/ping', (req, res) => {
    res.json( { msg: 'ok' });
});


app.listen(PORT, () => {
    console.log(`Upload service is running at ${PORT}`);
})