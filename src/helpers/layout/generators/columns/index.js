
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import makeUniqueKeyStr from '../../../utils/string/makeUniqueKeyStr';
import makeAnchorLink from '../html/anchor';

const makeColumnContent = ({ content, styles }) => {
    const {
        anchorClass = styles?.anchorClass ?? '',
        columnClass = content?.styles?.columnClass ?? "flex flex-col"
    } = styles;

    const contentContent = content.map((item) => {
        const itemKey = makeUniqueKeyStr(item.label);

        const anchorLink = makeAnchorLink({ ...item, anchorClass });
        return (
            <div
                key={itemKey}
                className={columnClass}>
                {anchorLink}
            </div>
        );

    });
    return (
        <div className={columnClass}>
            {contentContent}
        </div>

    );
};

const makeColumnLayout = ({ columns = [], styles }) => {
    // iterate over array of objects, generate bootstrap compatible markup
    const columnLayout = columns?.map((col) => {
        const { columnHeader, columnItems } = col;

        const columnContent = makeColumnContent({ content: columnItems, styles });
        const colKey = makeUniqueKeyStr(`${col.colId}_${columnHeader}`);
        return (
            <Col key={colKey}>
                <div>
                    <h5 className="border-b inline-block border-transparent text-md text-secondary dark:text-secondary-dark my-2 font-bold hover:border-gray-10">
                        {columnHeader}
                    </h5>
                    {columnContent}
                </div>
            </Col>
        );
    })
    return (<Row>{columnLayout}</Row>);
};

export default makeColumnLayout;