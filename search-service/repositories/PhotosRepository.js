const solr = require('shared/solr-connection.js');

const findByTagWithPagination = (tag, page, perPage) => {
    const query = `tag:${tag}&start=${page * perPage}&rows=${perPage}`;
    return solr.search('images', query);
}

module.exports = {
    findByTagWithPagination,
}