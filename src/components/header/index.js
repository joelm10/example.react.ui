import React from 'react';

import ImageLoader from '../../helpers/images/imageLoader';
import logo from '../../logo.svg';

const Header = () => {
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
