import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import SetPageTitle from './helpers/react/hooks/pageTitle';

// layout
import Layout from './components/layout';

const App = (props) => {
    const { pageTitle } = props;

    const appWrapper = (
        <Fragment>
            <SetPageTitle pageTitle={pageTitle} />
            <Layout {...props} />
        </Fragment>
    );
    return appWrapper;
};

export default App;
