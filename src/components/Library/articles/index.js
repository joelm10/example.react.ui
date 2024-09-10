import React, { Fragment, useEffect, useState } from 'react';

import getFromApi from '../../../services/network/api';
const mockURL = 'https://jsonplaceholder.typicode.com/posts';

const ArticleWrapper = (props) => {
    const { url = mockURL } = props;
    const [articleContent, setApiContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let apiResponse = await getFromApi(url);

            const formattedResponse = apiResponse
                ? apiResponse.map((item) => {
                    const { title, body, id: objKey } = item;
                    // /TODO: Move to generator/builder method
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
    }, [url]);

    return articleContent;
};

export default ArticleWrapper;