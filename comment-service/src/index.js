const commentsRoute = require('./routes/comments.js');
const express = require('express');

const PORT = process.env.COMMENTS_SERVICE_PORT;

const app = express();

app.use('/comments', commentsRoute);

app.listen(PORT, () => {
    console.log(`Comments service is running at ${PORT}`);
});