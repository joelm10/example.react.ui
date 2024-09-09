import React from 'react';
import Container from 'react-bootstrap/Container';

import columnLayout from '../../../helpers/layout/generators/columns';
import defaultFooterList from '../../../config/footer';

const Footer = ({ footerText = 'Default footer content', footerContent = defaultFooterList }) => {
    const footerLabelText = footerText;
    let footerColumns = {
        ...footerContent,
        anchorClass: StyleSheet.anchorClass ?? 'footer'
    };

    footerColumns = columnLayout(footerColumns);

    const footerWrapper = (
        <footer className="footer">
            <Container>
                {footerColumns}
                <span className="text-muted">{footerLabelText}</span>
            </Container>
        </footer>);
    return footerWrapper;
}

export default Footer;