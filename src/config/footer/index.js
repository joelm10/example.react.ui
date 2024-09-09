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
                    /**
                     * 
                        itemLabel: 'Home',
                        linkUrl: '/home',
                        childNav: [],
                        isInternalNav: true,
                        routeElement: 'app',
                     */
                    itemId: 1,
                    itemType: 'link',
                    label: 'Photography',
                    linkUrl: '/photography',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
                },
                {
                    itemId: 2,
                    itemType: 'link',
                    label: 'engineering',
                    linkUrl: '/engineering',
                    target: '_blank',
                    isInternalNav: true,
                    routeElement: 'app',
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
                    label: 'About Us',
                    linkUrl: '/about',
                    isInternalNav: true,
                    target: '_blank'
                },
                {
                    itemId: 2,
                    label: 'Careers',
                    itemType: 'link',
                    linkUrl: 'http://item2.com',
                    target: '_blank'

                },
                // {
                //     itemId: 3,
                //     label: 'Three item',
                //     itemType: 'link',

                //     linkUrl: 'http://item3.com',
                //     target: '_blank'
                // }
            ]
        }
    ]
};

export default defaultFooterList;