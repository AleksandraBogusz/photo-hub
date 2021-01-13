const fetch = require('node-fetch');

const SOLR_URL = process.env.SOLR_URL

const search = (collection, query) => {

    const checkStatus = (response) => {
        if (response.status !== 200) {
            throw new Error(`status ${response.status}`);
        }
        return response;
    }

    const parse = (json) => {
        const docs = json?.response?.docs
        if (!docs) {
            throw new Error("Undefined docs despite status 200.");
        }
        return docs
    }

    return new Promise((resolve, reject) => {
        fetch(`${SOLR_URL}/${collection}/select?q=${query}`)
            .then(response => checkStatus(response))
            .then(response => response.json())
            .then(json => parse(json))
            .then(docs => resolve(docs))
            .catch(err => reject(err))
    });
}

const post = (collection, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const checkStatus = (response) => {
        if (response.status !== 200) {
            throw new Error(`response status ${response.status}`);
        }
    }
    return new Promise((resolve, reject) => {
        fetch(`${SOLR_URL}/${collection}/update?commit=true&json.command=false`, options)
            .then(response => checkStatus(response))
            .then(_ => resolve())
            .catch(err => reject(err));

    })
}

module.exports = {
    search,
    post
}