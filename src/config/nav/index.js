/**
 * nav menu item/s
 * Required elements:
 * > rendering: 
 *  - label, linkUrl
 * > routing: 
 *  - routeElement, routeParams
 */

const navElements = [
    {
        label: 'Home',
        linkUrl: '/home',
        childNav: [],
        isInternalNav: true,
        routeElement: 'app',
        routeParams: {
            pageTitle: 'Home'
        }
    },
    {
        label: 'About Me',
        linkUrl: '/about',
        target: '_blank',
        childNav: [],
        // internal navigation
        isInternalNav: true,
        routeElement: 'app',
        routeParams: {
            pageTitle: 'About Me'
        }
    },
    {
        label: 'Recent Work',
        linkUrl: 'https://jmm.id.au/#projects',
        target: '_blank',
        childNav: [],
        isInternalNav: false,

    },
    {
        label: 'Photography',
        linkUrl: 'http://photography.com',
        childNav: [],
        isInternalNav: false,
    }
];

export default navElements;