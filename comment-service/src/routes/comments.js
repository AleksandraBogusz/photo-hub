const commentRepository = require('../repositories/commentRepository.js');
const express = require('express');
const cors = require('cors');
const jwt = require('shared/jwt.js').middleware;
const router = express.Router();

router.use(cors());
router.use(jwt);

router.get('/photo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await commentRepository.findAllCommentsByImageId(id);
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong." });
    }
});

module.exports = router;