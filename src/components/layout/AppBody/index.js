import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ArticleWrapper from '../../Library/articles';

// TODO: Add useContext() wrapper/provider for content
// ref: https://react.dev/reference/react/useContext
const AppBody = () => {

    const appBody = (
        <main role="main">
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto d-inline-block">
                        {/* <div>app goes here</div> */}
                        <ArticleWrapper />
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
