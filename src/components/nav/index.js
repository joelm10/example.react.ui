import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import makeKeyName from '../../helpers/utils/string/makeKeyName';

const NavWrapper = ({ navElements }) => {
    const buildNavItems = navElements?.map((item) => {
        const {
            itemLabel: label,
            itemLink
        } = item;

        const itemKey = item.itemKey ?? makeKeyName(label);

        const navItem = itemLink
            ? <Nav.Link href={itemLink}>{label}</Nav.Link>
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
