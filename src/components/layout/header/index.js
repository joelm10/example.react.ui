import React from 'react';

// TODO: update this  to take from props
import ImageLoader from '../../../helpers/images/imageLoader';
import logoItem from '../../../media/assets/logos/logo.svg';

const Header = (props) => {
    const { logo = logoItem } = props;
    const logoProps = {
        imgPath: logo,
        imgType: '',
        altText: 'test text',
        size: 'sml'
    };
    const Logo = <ImageLoader {...logoProps} />;

    return Logo;
};

export default Header;
