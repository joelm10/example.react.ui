import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import AnchorLink from 'components/Library/Atomic/anchor';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';

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
        const anchorProps = {
            ...item,
            altText,
            target,
            label,
            anchorClass: "nav-link active"
        };

        const navItem = linkUrl
            ? <AnchorLink {...anchorProps} />
            : label;

        const navItemList = (
            <Nav.Item
                role="menuitem"
                key={itemKey}
            >
                {navItem}
            </Nav.Item>
        );
        return navItemList;
    });

    const defaultActiveItem = buildNavItems?.length ? navElements[0]?.label : '';

    const navWrapper = buildNavItems?.length ? (
        <Navbar role="navigation"
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
