import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import useSetPageTitle from 'client/helpers/react/hooks/pageTitle';

// presentation
import 'styles/baseStyle.css';

// layout
import Layout from 'client/layout';

const App = (props) => {
    const { pageTitle } = props;
    useSetPageTitle(pageTitle);
    // TODO: wire up useful react-router-dom hooks here
    // https://reactrouter.com/en/main/hooks/use-match
    // breadcrumbs -> https://reactrouter.com/en/main/hooks/use-matches

    const appProps = {
        ...props
    };

    const appWrapper = (
        <Fragment>
            <Layout {...appProps} />
        </Fragment>
    );
    return appWrapper;
};

export default App;
