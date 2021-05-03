const mongo = require('shared/mongo-connection.js');

const _COLLECTION_NAME = 'image_comments';

const findAllCommentsByImageId = async (id, pageNum, pageSize) => {

    let data;
    const collection = await mongo.collection(_COLLECTION_NAME);
    const cursor = collection.find({ image_id: id }, { sort: [ 'timestamp', 'ascending' ]})
    const numSkip = pageSize * pageNum;
    if (pageNum && pageSize) {
        data = await cursor.skip(numSkip).limit(+pageSize).toArray();
    } else {
        data = await cursor.toArray();
    }

    return !data ? [] : data;
}

const addCommentByImageId = async (id, data) => {

    const collection = await mongo.collection(_COLLECTION_NAME);
    collection.insert(data);
}

module.exports = {
    findAllCommentsByImageId,
    addCommentByImageId
};