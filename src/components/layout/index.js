import React from 'react';
import Container from 'react-bootstrap/Container';

// import the things
import Header from '../header';
import NavWrapper from '../nav';
import AppBody from './AppBody';
import Footer from '../footer';

import navElements from '../../config/nav';

const Layout = () => (
    <Container fluid>
        <Header />
        <NavWrapper navElements={navElements} />
        <AppBody />
        <Footer />
    </Container>
);

export default Layout;
