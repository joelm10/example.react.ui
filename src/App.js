import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import useSetPageTitle from 'helpers/react/hooks/pageTitle';

// layout
import Layout from 'layout';

const App = (props) => {
    const { pageTitle } = props;
    useSetPageTitle(pageTitle);
    // TODO: wire up useful react-router-dom hooks here
    // https://reactrouter.com/en/main/hooks/use-match
    // breadcrumbs -> https://reactrouter.com/en/main/hooks/use-matches

    const appProps = {
        ...props
    }
    const appWrapper = (
        <Fragment>
            <Layout {...appProps} />
        </Fragment>
    );
    return appWrapper;
};

export default App;
