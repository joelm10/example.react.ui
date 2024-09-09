import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import makeUniqueKeyStr from '../../../../helpers/utils/string/makeUniqueKeyStr';
import makeAnchorLink from '../../../../helpers/layout/generators/html/anchor';

/**
 * Simple nav bar wrapper compoennt
 * utilises https://react-bootstrap.netlify.app/docs/components/navs
 * @param {*} param0 
 * @returns 
 */
const NavWrapper = ({ navElements }) => {
    const buildNavItems = navElements?.map((item) => {
        const {
            label,
            linkUrl,
        } = item;

        const itemKey = item.itemKey ?? makeUniqueKeyStr(label);
        const altText = item.altText ?? label;
        const target = item.target ?? null;

        const navItem = linkUrl
            ? makeAnchorLink({ ...item, altText, target, label, anchorClass: "nav-link active" })
            : label;

        const navItemList = (
            <Nav.Item
                key={itemKey}
            >
                {navItem}
            </Nav.Item>
        );
        return navItemList;
    });

    const defaultActiveItem = navElements[0].label;

    const navWrapper = navElements?.length ? (
        <Navbar
            variant="pills"
            expand="lg"
            className="bg-body-tertiary"
        >
            <Container>
                <Nav
                    defaultActiveKey={defaultActiveItem}
                >
                    {buildNavItems}
                </Nav>
            </Container>
        </Navbar>
    ) : null;

    return navWrapper;
};

export default NavWrapper;
