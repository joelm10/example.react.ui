import makeUniqueKeyStr from "../../../../utils/string/makeUniqueKeyStr";

const defaultClass = "border-b inline-block border-transparent text-sm text-primary";

/**
 * Generate an A markup object, with links, target and class support
 * @param {*} props 
 * @returns 
 */
const makeAnchorLink = (props) => {
    const {
        altText,
        itemKey = makeUniqueKeyStr(props.label),
        linkUrl,
        target = "",
        label,
        anchorClass = defaultClass
    } = props;

    const anchorHtml = label ? (
        <a
            key={itemKey}
            href={linkUrl}
            target={target}
            className={anchorClass}
            title={altText}
        >
            {label}
        </a>
    ) : null;

    return anchorHtml;
};

export default makeAnchorLink;