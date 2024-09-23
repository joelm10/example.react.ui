import { Link } from "react-router-dom";

import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";

const defaultClass = "border-b inline-block border-transparent text-sm text-primary";

/**
 * Generate an A markup object, with links, target and class support
 * @param {*} props 
 * @returns 
 */
const AnchorLink = (props) => {
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

    // TODO: consider handler for any external linnks, auto set target (middleware, rather than here)
    // skip if internal- remove new tab/window
    let targetRuntime = isInternalNav ? "" : target;

    const anchorProps = {
        title: altText,
        className: anchorClass
    }

    let anchorHtml = null;
    if (isInternalNav) {
        // Ref: https://reactrouter.com/en/main/components/link#link
        const linkProps = {
            to: linkUrl,
            preventScrollReset: false,
            // relative?: "route" | "path";
            // reloadDocument?: boolean;
            // replace?: boolean;
            // state?: any;
            // unstable_viewTransition?: boolean;
            ...anchorProps
        };
        
        // generate <Link /> object
        anchorHtml = label !== '' && (
            <Link
                key={itemKey}
                {...linkProps}
            >
                {label}
            </Link>
        );
    } else {
        anchorHtml = label !== '' && (
            <a
                key={itemKey}
                href={linkUrl}
                target={targetRuntime}

                {...anchorProps}
            >
                {label}
            </a>
        );
    }

    return anchorHtml;
};

export default AnchorLink;