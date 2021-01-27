const solr = require('shared/solr-connection.js');

const findByTagWithPagination = (tag, page, perPage) => new Promise((resolve, reject) => {
    const query = `tag:${tag}&start=${page * perPage}&rows=${perPage}`;
    solr.search('images', query)
});