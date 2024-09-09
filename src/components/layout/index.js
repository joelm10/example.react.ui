import React from 'react';
import Container from 'react-bootstrap/Container';

// import the things
import Header from './header';
import NavWrapper from './header/nav';
import AppBody from './appBody';
import Footer from './footer';

import navElements from '../../config/nav';

const Layout = () => (
    <Container fluid>
        <header className=''>
            <Header />
            <NavWrapper navElements={navElements} />
        </header>
        <AppBody />
        <Footer />
    </Container>
);

export default Layout;
