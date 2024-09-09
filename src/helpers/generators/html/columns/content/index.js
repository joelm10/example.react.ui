import makeUniqueKeyStr from '../../../../utils/string/makeUniqueKeyStr';
import makeAnchorLink from '../../anchor';

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

export default makeColumnContent;