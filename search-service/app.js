const express = require('express');
const cors = require('cors');
// const solr = require('shared/solr-connection.js');
const jwt = require('shared/jwt.js');
const photosRepository = require('./repositories/PhotosRepository.js');

const PORT = process.env.SEARCH_SERVICE_PORT;
const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
    res.json({msg: "pong"});
});

app.get('/search', jwt.middleware, (req, res) => {
    const q = req.query?.q;
    const page = req.query?.page || 0;
    const perPage = req.query?.per_page || 30;

    if (!q) {
        return res.status(400).json({ msg: "Missing ?q parameter." });
    }

    photosRepository.findByTagWithPagination(q, page, perPage)
        .then(docs => {
            return res
                .status(200)
                .json(docs);
        })
        .catch(err => {
            return res
                .status(500)
                .json({ msg: "Something went wrong!" });
        });
});

app.get('/explore', jwt.middleware, (_, res) => {
    photosRepository.findTheMostFrequentTags()
        .then(docs => {
            return res
                .status(200)
                .json(docs);
        })
        .catch(err => {
            return res
                .status(500)
                .json({ msg: "Something went wrong!" });
        })
});

app.listen(PORT, () => {
    console.log(`search service is running at ${PORT}`);
});

process.on('SIGINT', () => {
    process.exit();
});