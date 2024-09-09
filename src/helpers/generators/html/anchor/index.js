import makeUniqueKeyStr from "../../../utils/string/makeUniqueKeyStr";

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
        anchorClass = defaultClass,
        // routing specific flag
        isInternalNav = false
    } = props;

    // TODO: add link handler for leaving site
    // TODO: consider handler for any external linnks, auto set target (middleware, rather than here)
    // skip if internal- remove new tab/window
    let targetRuntime = isInternalNav ? "" : target;


    const anchorHtml = label !== '' ? (
        <a
            key={itemKey}
            href={linkUrl}
            target={targetRuntime}
            className={anchorClass}
            title={altText}
        >
            {label}
        </a>
    ) : null;

    return anchorHtml;
};

export default makeAnchorLink;