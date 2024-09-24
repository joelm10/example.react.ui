// TODO: Consider storing under schema namespace
// eg: /config/meta/schema/fileName.js
const articleSchemas = {
    posts: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        articleLimit: 12,
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
    }
};

// TODO: Move to config;
const articleMappings = {
    user: articleSchemas.user,
    posts: articleSchemas.posts,
    photography: articleSchemas.photography
};

export default articleMappings;