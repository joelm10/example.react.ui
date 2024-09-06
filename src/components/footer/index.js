import React from 'react';
import columnLayout from '../../helpers/layout/generators/columns';

import columnListMOCK from '../../config/columns/mockFooter';

const Footer = ({ footerText = 'Default footer content', footerContent = columnListMOCK }) => {
    const footerLabelText = footerText;

    // TOOD: Move to column generator method;
    const footerColumns = columnLayout(footerContent);

    const footerWrapper = (
        <footer className="footer">
            {footerColumns}
            <span className="text-muted">{footerLabelText}</span>
        </footer>);
    return footerWrapper;
}

export default Footer;
