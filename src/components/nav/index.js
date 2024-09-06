import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import makeUniqueKeyStr from '../../helpers/utils/string/makeUniqueKeyStr';

const NavWrapper = ({ navElements }) => {
    const buildNavItems = navElements?.map((item) => {
        const {
            itemLabel: label,
            itemLink: itemUrl,
        } = item;
        const altText = item.altText ?? label;
        const itemKey = item.itemKey ?? makeUniqueKeyStr(label);
        // TODO: refactor to use makeAnchorLink() method;
        const itemTarget = item.target ? '_blank' : null;
        const navItem = itemUrl
            ? (
                <Nav.Link
                    href={itemUrl}
                    title={altText}
                    target={itemTarget}
                >
                    {label}
                </Nav.Link>
            )
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

    const navWrapper = navElements?.length ? (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Nav>
                    {buildNavItems}
                </Nav>
            </Container>
        </Navbar>
    ) : null;
    return navWrapper;
};

export default NavWrapper;
