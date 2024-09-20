import Container from 'react-bootstrap/Container';
import { createContext } from 'react';

// import the things
import AppBody from './appBody';
import Footer from './footer';
import Header from './header';
import NavWrapper from './header/nav';

import navElements from '../config/nav';

const Layout = (props) => {
    // const LayoutContext = createContext(null);

    return (
        // <LayoutContext.Provider value={props}>
            <Container fluid>
                <header className=''>
                    <Header />
                    <NavWrapper navElements={navElements} />
                </header>
                <AppBody {...props} />
                <Footer />
            </Container>
        // </LayoutContext.Provider>
    );
};

export default Layout;
