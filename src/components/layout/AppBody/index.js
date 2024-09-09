import React, { Fragment, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import getFromApi from '../../../services/network/api';

// TODO: Add useContext() wrapper/provider for content
// ref: https://react.dev/reference/react/useContext
const AppBody = () => {
    const [apiContent, setApiContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://jsonplaceholder.typicode.com/posts';
            let apiResponse = await getFromApi(url);

            const formattedResponse = apiResponse
                ? apiResponse.map((item) => {
                    const { title, body, id: objKey } = item;

                    return (
                        <Fragment key={objKey}>
                            <h2>{title}</h2>
                            {body}
                        </Fragment>
                    );
                })
                : (<Fragment>No records</Fragment>);

            setApiContent(formattedResponse);

        };

        fetchData();
    }, []);

    const appBody = (
        <main>
            <article>
                <Container
                    className='min-vh-75'
                >
                    <Row className="h-auto d-inline-block">
                        <div>app goes here</div>
                        {apiContent}
                    </Row>
                </Container>
            </article>
        </main>

    );
    return appBody;
};

export default AppBody;
