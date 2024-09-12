import { Fragment } from 'react';
import Image from 'react-bootstrap/Image';
import makeUniqueKeyStr from '../../../helpers/utils/string/makeUniqueKeyStr';

/**
 * Wrapper around image
 * @param {object} param0 
 * @returns React.Component
 * TODO: image width/height defaults
 */
const ImageLoader = ({
    imgType, imgPath, altText, size, width = '30', height = '30'
}) => {
    // add img type check - png, etc
    const imgObject = imgType === ''
        ? (
            <Image
                fluid
                src={imgPath}
                alt={altText}
                className={size}
                width={width}
                height={height}
            />
        )
        : imgPath;

    const imgKey = makeUniqueKeyStr(altText);

    return <Fragment key={imgKey}>{imgObject}</Fragment>;
};

export default ImageLoader;
