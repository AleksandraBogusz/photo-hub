const express = require('express');
const solr = require('shared/solr-connection.js');

const PORT = process.env.SEARCH_SERVICE_PORT;
const app = express();

app.get('/ping', (req, res) => {
    res.send("ok");
});

app.listen(PORT, () => {
    console.log(`search service is running at ${PORT}`);
});

process.on('SIGINT', () => {
    process.exit();
});