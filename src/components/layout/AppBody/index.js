import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// TODO: Add useContext() wrapper/provider for content
// ref: https://react.dev/reference/react/useContext
const AppBody = () => {
    const appBody = (
        <main>
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto d-inline-block">
                        <div>app goes here</div>
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
