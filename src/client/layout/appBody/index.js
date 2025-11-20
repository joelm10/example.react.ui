
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ArticleWrapper from 'client/components/Library/Atomic/articles';
import ChartWrapper from 'client/components/Library/Widgets/Charts';
import GameWrapper from 'client/components/Library/Widgets/Games/TicTacToe';
import KanbanBoard from 'client/components/Library/Widgets/Kanban';
import schemaMappings from 'client/config/schema';


// TODO: Add useContext() wrapper/provider for content
// ref: https://react.dev/reference/react/useContext
const AppBody = (props) => {
    const { activePage } = props;
    // TODO: put into enum lookup method();
    let articleProps = { pageTitle: '', className: '' };
    switch (activePage) {
        case '/':
        case '/home':
            articleProps = { ...schemaMappings.posts, pageTitle: '', className: '' };
            break;
        case '/about':
            articleProps = { ...schemaMappings.user, pageTitle: '', className: '' };
            break;
        case '/photography':
            articleProps = { ...schemaMappings.photography, pageTitle: '', className: '' };
            break;
        case '/engineering':
            articleProps = { ...schemaMappings.engineering, pageTitle: '', className: '' };
            break;
        case '/game':
            articleProps = { ...schemaMappings.game, pageTitle: '', className: '' };
            break;
        case '/kanban':
            articleProps = { ...schemaMappings.kanban, pageTitle: '', className: '' };
            break;
        default:
            articleProps = { pageTitle: '', className: '' };
    }
    // END TODO: 
    // TODO: move to helper function
    /**
     * Get the active content based on the current page
     * @param {string} activePage
     * @returns {JSX.Element} The content component for the active page
     */
    const getActiveContent = (activePage) => {
        if (activePage?.includes('chart')) {
            const isRoot = activePage === '/chart';
            let chartProps = {
                // get from URL
                chartType: isRoot ? 'bar' : activePage.split('/').pop()
            };
            return <ChartWrapper {...chartProps} />;
        } else if (activePage === '/game') {
            return <GameWrapper />;
        } else if (activePage === '/kanban') {
            return (
                <div className="kanban-container">
                    <KanbanBoard {...articleProps} />
                </div>
            )
        } else {
            return <ArticleWrapper {...articleProps} />;
        }
    }
    // Set container to be fluid (full width) if on kanban page
    const isKanbanPage = activePage === '/kanban' ? 'min-vh-100' : 'min-vh-75';
    const containerClass = ` ${isKanbanPage}`;
    let content = getActiveContent(activePage);

    if (activePage !== '/kanban') {
        content = (
            <article>
                <Container
                    className={containerClass}
                >
                    <Row className="h-auto">
                        {content}
                    </Row>
                </Container>
            </article>
        );
    }

    const appBody = (
        <main role="main">
            {content}
        </main>

    );
    return appBody;
};

export default AppBody;
