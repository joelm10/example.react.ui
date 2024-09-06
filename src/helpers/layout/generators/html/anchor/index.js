import makeUniqueKeyStr from "../../../../utils/string/makeUniqueKeyStr";

const defaultClass = "border-b inline-block border-transparent text-sm text-primary";

const makeAnchorLink = (props) => {
    const {
        altText,
        itemKey = makeUniqueKeyStr(props.label),
        linkUrl,
        target,
        label,
        anchorClass = defaultClass
    } = props;

    const anchorHtml = (
        <a
            key={itemKey}
            href={linkUrl}
            target={target}
            className={anchorClass}
            title={altText}
        >
            {label}
        </a>

    );
    return anchorHtml;
};

export default makeAnchorLink;