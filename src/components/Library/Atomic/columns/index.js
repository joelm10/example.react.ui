
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ColumnContent from './ColumnContent';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';

const ColumnLayout = ({ columns = [], styles }) => {
    // iterate over array of objects, generate bootstrap compatible markup
    const columnLayout = columns?.map((col) => {
        const { columnHeader, columnItems } = col;

        const colKey = makeUniqueKeyStr(`${col.colId}_${columnHeader}`);
        const columnContent = <ColumnContent content={columnItems} styles />;

        // TODO: correct h5 classname structure
        const headingStyle = "border-b inline-block border-transparent text-md text-secondary dark:text-secondary-dark my-2 font-bold hover:border-gray-10";
        return (
            <Col key={colKey}>
                <div>
                    <h5
                        className={headingStyle}>
                        {columnHeader}
                    </h5>
                    {columnContent}
                </div>
            </Col>
        );
    });

    return columnLayout.length
        ? <Row>{columnLayout}</Row>
        : null;
};

export default ColumnLayout;