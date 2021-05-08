const commentsRoute = require('./routes/comments.js');
const express = require('express');

const repo = require('./repositories/commentRepository');

const PORT = process.env.COMMENTS_SERVICE_PORT;

const app = express();

app.use('/comments', commentsRoute);

app.get('/test', async (req, res) => {
    await repo.addCommentByImageId("0", "some comment");
    res.send('ok');
});

app.listen(PORT, () => {
    console.log(`Comments service is running at ${PORT}`);
});