const mongo = require('shared/mongo-connection.js');

const COLLECTION_NAME = 'image_comments';

const findAllCommentsByImageId = async (id) => {
    const collection = await mongo.collection(COLLECTION_NAME)
    const data = await collection.findOne({ image_id: id });
    if (!data) { return []; }
    return data;
}

module.exports = {
    findAllCommentsByImageId,
};