// TODO: Consider storing under schema namespace
// eg: /config/meta/schema/fileName.js
const articleSchemas = {
    posts: {
        // url: 'https://jsonplaceholder.typicode.com/posts',
        url: 'https://dummyjson.com/posts',
        articleLimit: 12,
        meta: {
            // response body initial key
            baseResponseKey: 'posts',
            heading: 'title',
            content: 'body',
            footer: '',
            errorState: 'No posts found',
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
    game: {
        url: 'null',
        articleLimit: 20,
        meta: {
            heading: 'id',
            content: 'title',
            footer: 'completed'
        },
    },
    chart: {
        url: 'null',
        articleLimit: 2,
        meta: {
            heading: 'id',
            content: 'title',
            footer: 'completed'
        },
    },
    kanban: {
        url: 'null',
        articleLimit: 0,
        meta: {
            heading: 'id',
            content: 'title',
            footer: ''
        },
    }
};

// TODO: Move to config;
const schemaMappings = {
    ...articleSchemas,
    // user: articleSchemas.user,
    // posts: articleSchemas.posts,
    // photography: articleSchemas.photography,
    // engineering: articleSchemas.engineering
};

export default schemaMappings;