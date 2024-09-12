import React from 'react';

// TODO: update this  to take from props
import ImageLoader from '../../Library/images/imageLoader';
import logoItem from '../../../media/assets/logos/logo.svg';

const Header = (props) => {
    const { logo = logoItem } = props;
    const logoProps = {
        imgPath: logo,
        imgType: '',
        altText: 'test text',
        size: 'sml'
    };
    const Logo = logoItem ? <ImageLoader {...logoProps} /> : null;

    return Logo;
};

export default Header;
