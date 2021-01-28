const fs = require('fs').promises;

const options = {
    encoding: 'UTF-8'
}

const HARDCODED_TAGS = [ 'fashion', 'nice', 'cool', 'awesome'];
const HARDCODED_DESC = 'fashion';
const HARDCODED_TITLE = 'fashion';
let image_id = 150;

fs.readFile('./fash3.json', options)
    .then(content => {
        const json = JSON.parse(content);
        const results = json.results.map(result => {
            const url = result.urls.small;
            const tags = result.tags.map(tag => tag.title);
            const description = result?.description

            return {
                image_id: image_id++,
                owner_id: 'login1',
                url,
                title: HARDCODED_TITLE,
                description: !description ? HARDCODED_DESC : description,
                tag: tags.length == 0 ? HARDCODED_TAGS : tags,
            }
        });

        console.log(JSON.stringify(results));

    })
    .catch(err => {
        console.log(err);
    });