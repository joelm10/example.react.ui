// import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ArticleWrapper from 'components/Library/Atomic/articles';
import articleMappings from 'config/schema';

// TODO: Add useContext() wrapper/provider for content
// ref: https://react.dev/reference/react/useContext
const AppBody = (props) => {
    // could/should this use useContext() instead?
    // const pageTitle = useContext();
    const location = useLocation();

    const activePage = location.pathname;
    let articleProps = {
        pageTitle: '',
        className: 'foo'
    };

    // TODO: put into enum lookup method();
    if (activePage === '/' || activePage === '/home') {
        articleProps = {
            ...articleMappings.posts,
            ...articleProps
        }
    } else if (activePage === '/about') {
        articleProps = {
            ...articleMappings.user,
            ...articleProps
        }
    } else if (activePage === '/photography') {
        articleProps = {
            ...articleMappings.photography,
            ...articleProps
        }
    }
    // END TODO: 

    const appBody = (
        <main role="main">
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto d-inline">
                        <ArticleWrapper {...articleProps} />
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
