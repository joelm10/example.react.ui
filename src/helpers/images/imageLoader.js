import { Fragment } from 'react';
import Image from 'react-bootstrap/Image';

const ImageLoader = ({
    imgType, imgPath, altText, size
}) => {
    // add img type check - png, etc
    const imgObject = imgType === ''
        ? (
            <Image
                fluid
                src={imgPath}
                alt={altText}
                className={size}
                width="30"
                height="30"
            />
        )
        : imgPath;
    const imgKey = 'foo';

    return <Fragment key={imgKey}>{imgObject}</Fragment>;
};

export default ImageLoader;
