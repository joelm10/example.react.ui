import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
// import { createContext } from 'react';
import { useLocation } from 'react-router-dom';

// import the things
import AppBody from './appBody';
import Footer from './footer';
import Header from './header';
import NavWrapper from './header/nav';
import navElements from 'config/nav';

import LinkedInLayout from 'components/Library/Widgets/LinkedIn';


const Layout = (props) => {
    // const LayoutContext = createContext(null);

    // could/should this use useContext() instead?
    // const pageTitle = useContext();

    const location = useLocation();

    const activePage = location.pathname;
    let contentLayout = (
        <Fragment>
            <header className=''>
                <Header />
                <NavWrapper navElements={navElements} />
            </header>
            <AppBody {...props} activePage={activePage} />
            <Footer />
        </Fragment>
    );
    if (activePage === '/linkedin') {
        contentLayout = (
            <div className="linkedin-container">
                <LinkedInLayout {...props} />
            </div>
        )
    };

    return (
        // <LayoutContext.Provider value={props}>
        <Container fluid>
            {/* <header className=''>
                <Header />
                <NavWrapper navElements={navElements} />
            </header>
            <AppBody {...props} activePage={activePage} />
            <Footer />
             */}
            {contentLayout}
        </Container>
        // </LayoutContext.Provider>
    );
};

export default Layout;
