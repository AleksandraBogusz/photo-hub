const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = require('../multer/azure-blob-storage');
const solr = require('shared/solr-connection');
const jwt = require('shared/jwt').middleware
const { v4 } = require('uuid');

const upload = multer({ storage });

const router = express.Router();

router.use(cors())

// TODO: add multer error handling
// TODO: title, description and tag validation happens after the file gets uploaded
// TODO: capture user's login/uuid from jwt payload
router.post('/', jwt, upload.single('main-photo'), (req, res) => {
    const title       = req?.body?.title;
    const description = req?.body?.description;
    const tag         = req?.body?.tag;
    const url         = req.file.path

    // a title is mandatory
    if (!title) {
        console.log('title', title);
        return res.status(400).json({ msg: "Missing image title." })
    }

    // description isn't mandatory, could be an empty
    if (!description === undefined) {
        return res.status(400).json({ msg: "Missing image description." })
    }

    // tags are mandatory
    if (!tag) {
        return res.status(400).json({ msg: "Missinnng image tags." })
    }

    const tags = tag.split(', ');

    const data = {
        image_id: v4(),
        owner_id:"login1",
        url,
        title,
        description,
        tag: tags
     }

    solr.post('images', data)
     .catch(err => {
         return res.status(500).json({ msg: "Something went wrong." });
     });

    res.json({ url });
});

module.exports = router;
