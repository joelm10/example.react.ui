/**
 * Routing MUST occur from here, or ./config/nav/index.js to be found
 */
const defaultFooterList = {
    styles: {
        anchorClass: 'nav-link p-0 text-muted '
    },
    columns: [
        {
            // colId: 1,
            columnHeader: 'Products',
            columnItems: [
                {
                    itemId: 1,
                    itemType: 'link',
                    label: 'Photography',
                    linkUrl: '/photography',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'Photography'
                    }
                },
                {
                    itemId: 2,
                    itemType: 'link',
                    label: 'engineering',
                    linkUrl: '/engineering',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'engineering'
                    }
                },
                {
                    itemId: 2,
                    itemType: 'link',
                    label: 'game',
                    linkUrl: '/game',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'game things'
                    }
            
                },
                {
                    itemId: 3,
                    itemType: 'link',
                    label: 'chart',
                    linkUrl: '/chart',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'chartJS wrapper'
                    }
                },
                {
                    itemId: 4,
                    itemType: 'link',
                    label: 'kanban',
                    linkUrl: '/kanban',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'kanban board'
                    }
                },
                {
                    itemId: 5,
                    itemType: 'link',
                    label: 'LinkedIn',
                    linkUrl: '/linkedin',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'LinkedIn UI example'
                    }
                }
            ]
        },
        {
            colId: 2,
            columnHeader: 'Company Information',
            columnItems: [
                {
                    itemId: 1,
                    itemType: 'link',
                    label: 'About Me',
                    linkUrl: '/about-me',
                    isInternalNav: true,
                    target: '_blank',
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'About Me'
                    }
                },
                {
                    itemId: 2,
                    label: 'Linked In',
                    itemType: 'link',
                    linkUrl: 'https://www.linkedin.com/in/joel-morrison-6a57432/',
                    target: '_blank',
                    routeElement: 'app',
                    routeParams: {
                        pageTitle: 'careers'
                    }
                }
            ]
        }
    ]
};

export default defaultFooterList;
