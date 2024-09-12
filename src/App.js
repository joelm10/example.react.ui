import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import useSetPageTitle from './helpers/react/hooks/pageTitle';

// layout
import Layout from './components/layout';

const App = (props) => {
    const { pageTitle } = props;
    useSetPageTitle(pageTitle);
    const appWrapper = (
        <Fragment>
            <Layout {...props} />
        </Fragment>
    );
    return appWrapper;
};

export default App;
