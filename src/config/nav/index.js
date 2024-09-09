/**
 * nav menu item/s
 */
const navElements = [
    {
        label: 'Home',
        linkUrl: '/home',
        childNav: [],
        isInternalNav: true,
        routeElement: 'app',
    },
    {
        label: 'About Me',
        linkUrl: '/about',
        target: '_blank',
        childNav: [],
        // internal navigation
        isInternalNav: true,
        routeElement: 'app'
    },
    {
        label: 'Recent Work',
        linkUrl: 'https://jmm.id.au/#projects',
        childNav: [],
        isInternalNav: true,

    },
    {
        label: 'Photography', linkUrl: 'http://photography.com', childNav: [],
        isInternalNav: true,
    }
];

export default navElements;