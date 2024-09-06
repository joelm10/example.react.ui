
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import makeUniqueKeyStr from '../../../utils/string/makeUniqueKeyStr';
import makeAnchorLink from '../html/anchor';

const makeColumnContent = (content) => {
    const contentContent = content.map((item) => {
        const {
            itemId,
            // TODO: Future flag for empty columns/unique content types
            itemType,
            label,
            linkUrl,
            target,
            itemKey = makeUniqueKeyStr(label)
        } = item;

        const AnchorLink = makeAnchorLink(item);
        // TODO: move to link generator method, add class handler
        return (
            <div className="flex flex-col">
                {AnchorLink}
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