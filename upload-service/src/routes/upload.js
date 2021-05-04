const express = require('express');
const multer = require('multer');
const storage = require('../multer/azure-blob-storage');

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('main-photo'), (req, res) => {

});

module.exports = router;
