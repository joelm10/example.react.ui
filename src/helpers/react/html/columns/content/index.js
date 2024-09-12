import makeUniqueKeyStr from '../../../../utils/string/makeUniqueKeyStr';
import AnchorLink from '../../../../../components/Library/anchor';

/**
 * Generate HTML to display column/s, 
 *  containing one/many A href links.
 * @param {object} props 
 * @param {array} props.content - Array of links to put into a column
 * @param {object} props.styles - styling to apply to each link in area
 * @returns React.JSX
 */
const makeColumnContent = (props) => {
    const { content = [], styles } = props;
    const {
        anchorClass = styles?.anchorClass ?? '',
        columnClass = content?.styles?.columnClass ?? "flex flex-col"
    } = styles;

    const columnContent = content?.map((item) => {
        const itemKey = makeUniqueKeyStr(item.label);
        const anchorProps = {
            ...item, anchorClass
        };
        return (
            <div
                key={itemKey}
                className={columnClass}>
                <AnchorLink {...anchorProps} />
            </div>
        );
    });
    const columnWrapper = columnContent?.length ? (
        <div className={columnClass}>
            {columnContent}
        </div>
    ) : null;

    return columnWrapper;
};

export default makeColumnContent;