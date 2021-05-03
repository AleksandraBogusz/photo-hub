const commentRepository = require('../repositories/commentRepository.js');
const express = require('express');
const cors = require('cors');
const jwt = require('shared/jwt.js').middleware;
const router = express.Router();

router.use(cors());
router.use(jwt);

router.get('/photo/:id', async (req, res) => {
    const id = req.params.id;
    const pageNum = req.query?.pageNum || 0;
    const pageSize = req.query?.pageSize || 30;
    try {
        const data = await commentRepository.findAllCommentsByImageId(id, pageNum, pageSize);
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong." });
    }
});


router.post('/photo/:id', express.json(), async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const data = { image_id: id, ...body, timestamp: Date.now() };

    try {
        await commentRepository.addCommentByImageId(id, data);
        return res.json({ msg: "ok" });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong." });
    }

});

module.exports = router;