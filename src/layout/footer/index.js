import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import defaultFooterList from '../../config/footer';
import ColumnLayout from '../../components/Library/Atomic/columns';

const Footer = ({ footerText = 'Default footer copyright', footerContent = defaultFooterList }) => {
    const footerLabelText = footerText;
    let footerColumns = {
        ...footerContent,
        anchorClass: StyleSheet.anchorClass ?? 'footer'
    };

    footerColumns = <ColumnLayout columns={footerColumns.columns} />;

    const footerWrapper = (
        <footer
            className="footer"
            role="contentinfo"
        >
            <Container>
                {footerColumns}
                <Row>
                    <span className="text-muted footer__copyright">{footerLabelText}</span>
                </Row>
            </Container>
        </footer>);
    return footerWrapper;
}

export default Footer;