
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const makeColumnContent = (content) => {
    const contentContent = content.map((item) => {
        const {
            itemId,
            itemType,
            label,
            linkUrl,
            target
        } = item;

        // TODO: move to link generator method, add class handler
        return (

            <div className="flex flex-col">
                <a
                    key={itemId}
                    href={linkUrl}
                    target={target}
                    className="border-b inline-block border-transparent text-sm text-primary"
                >
                    {label}
                </a>
            </div>
        );

    });
    return (
        <div className="flex flex-col">
            {contentContent}
        </div>

    );
};

const makeColumnLayout = (columnList = []) => {
    // iterate over array of objects, generate bootstrap compatible markup
    const columnLayout = columnList?.map((col) => {
        const { columnHeader, columnItems } = col;

        const columnContent = makeColumnContent(columnItems);

        return (
            <Col>
                <div>
                    <div className="border-b inline-block border-transparent text-md text-secondary dark:text-secondary-dark my-2 font-bold hover:border-gray-10">
                        {columnHeader}
                    </div>
                    {columnContent}
                </div>
            </Col>
        );
    })
    return (<Row>{columnLayout}</Row>);
};

export default makeColumnLayout;