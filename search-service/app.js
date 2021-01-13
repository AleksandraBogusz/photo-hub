const express = require('express');

const PORT = process.env.SEARCH_SERVICE_PORT;
const app = express();

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`search service is running at ${PORT}`);
});

process.on('SIGINT', () => {
    process.exit();
});