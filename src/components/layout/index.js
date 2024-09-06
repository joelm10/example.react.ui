import React from 'react';
import Container from 'react-bootstrap/Container';

// import the things
import Header from '../header';
import NavWrapper from '../nav';
import AppBody from './AppBody';
import Footer from '../footer';

const navElements = [
    {
        itemLabel: 'Google', itemLink: 'http://google.com'
    },
    {
        itemLabel: 'Photography', itemLink: 'http://photography.com'
    }
];

// TODO: Import all components and return in core framework
const Layout = () => (
    <Container fluid>
        <Header />
        <NavWrapper navElements={navElements} />
        <AppBody />
        <Footer />
    </Container>
);

export default Layout;
