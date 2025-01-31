// TODO: Consider storing under schema namespace
// eg: /config/meta/schema/fileName.js
const articleSchemas = {
    posts: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        articleLimit: 10,
        meta: {
            heading: 'title',
            content: 'body',
            footer: ''
        }
    },
    user: {
        url: 'https://jsonplaceholder.typicode.com/users',
        articleLimit: 20,
        meta: {
            heading: 'name',
            content: 'email',
            footer: ''
        },
    },
    photography: {
        url: 'https://jsonplaceholder.typicode.com/photos',
        articleLimit: 80,
        meta: {
            heading: 'title',
            content: '',
            footer: '',
            // Extend for images
            imgPath: 'url',
            imgThumbPath: 'thumbnailUrl',
        }
    },
    engineering: {
        url: 'https://jsonplaceholder.typicode.com/todos',
        articleLimit: 20,
        meta: {
            heading: 'id',
            content: 'title',
            footer: 'completed'
        },
    },
};

// TODO: Move to config;
const articleMappings = {
    ...articleSchemas,
    // user: articleSchemas.user,
    // posts: articleSchemas.posts,
    // photography: articleSchemas.photography,
    // engineering: articleSchemas.engineering
};

export default articleMappings;