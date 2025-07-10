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
    // TODO: put into enum lookup method();
    let articleProps = { pageTitle: '', className: '' };
    switch (activePage) {
        case '/':
        case '/home':
            articleProps = { ...articleMappings.posts, pageTitle: '', className: '' };
            break;
        case '/about':
            articleProps = { ...articleMappings.user, pageTitle: '', className: '' };
            break;
        case '/photography':
            articleProps = { ...articleMappings.photography, pageTitle: '', className: '' };
            break;
        case '/engineering':
            articleProps = { ...articleMappings.engineering, pageTitle: '', className: '' };
            break;
        case '/game':
            articleProps = { ...articleMappings.game, pageTitle: '', className: '' };
            break;
        default:
            articleProps = { pageTitle: '', className: '' };
    }
    // END TODO: 

    const getActiveContent = (activePage) => {
        if (activePage.includes('chart')) {
            const isRoot = activePage === '/chart';
            let chartProps = {
                // get from URL
                chartType: isRoot ? 'bar' : activePage.split('/').pop()
            };
            return <ChartWrapper {...chartProps} />;
        } else if (activePage === '/game') {
            return <GameWrapper />;
        } else {
            return <ArticleWrapper {...articleProps} />;
        }
    }

    let content = getActiveContent(activePage);

    const appBody = (
        <main role="main">
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto">
                        {content}
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
