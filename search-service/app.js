const express = require('express');
const solr = require('shared/solr-connection.js');

const PORT = process.env.SEARCH_SERVICE_PORT;
const app = express();

app.get('/ping', (req, res) => {
    res.send("ok");
});

// TODO: jwt check middleware
app.get('/search', (req, res) => {
    const term = req.query?.term;
    if (!term) {
        return res
            .status(400)
            .json({msg: "Missing ?term query parameter."})
    }

    //TODO: prevent any query injections
    const query = `tag:${term} OR title:${term}`;
    solr.search('images', query)
        .then(docs => res.json(docs))
        .catch(err => res.status(500).json({err: err.toString()}))
});


app.listen(PORT, () => {
    console.log(`search service is running at ${PORT}`);
});

process.on('SIGINT', () => {
    process.exit();
});