import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ChartWrapper from 'components/Library/Widgets/Charts';
import GameWrapper from 'components/Library/Widgets/Games/TicTacToe';
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
        className: ''
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
    } else if (activePage === '/engineering') {
        articleProps = {
            ...articleMappings.engineering,
            ...articleProps
        }
    } else if (activePage === '/game') {
        articleProps = {
            ...articleMappings.game,
            ...articleProps
        }
    }

    // END TODO: 
    let content = null;
    // Setup as switch or get method
    switch (activePage) {
        case '/chart': {
            content = <ChartWrapper />;
            break;
        }
        case '/game': {
            content = <GameWrapper />;
            break;
        }
        default: {
            content = <ArticleWrapper {...articleProps} />;
        }
    };

    const appBody = (
        <main role="main">
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto d-inline">
                        {content}
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
