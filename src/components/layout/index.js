import React from 'react';

// import the things
import Header from '../header';
import Nav from '../nav';
import Footer from '../footer';

// TODO: Import all components and return in core framework
class Layout extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Nav/>
                <Footer/>
            </div>
        );
    }
}


export default Layout;