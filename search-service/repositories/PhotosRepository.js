const solr = require('shared/solr-connection.js');

const findByTagWithPagination = (tag, page, perPage) => {
    const query = `q=tag:${tag}&start=${page * perPage}&rows=${perPage}`;
    return solr.search('images', query);
}

const findTheMostFrequentTags = () => new Promise((resolve, reject) => {
    const query = 'facet.field=tag&facet=on&q=*:*&rows=0';
    solr.rawQuery('images', query)
        .then(json => {
            const tag = json?.facet_counts?.facet_fields?.tag
            resolve(tag);
        })
        .catch(err => reject(err))
})
    

module.exports = {
    findByTagWithPagination,
    findTheMostFrequentTags
}