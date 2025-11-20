// TODO: update this  to take from props
import ImageLoader from 'client/components/Library/Atomic/images/imageLoader';
import logoItem from 'client/media/assets/logos/logo.svg';

/**
 * Return a header Image
 * @param {object} props 
 * @returns 
 */
const Header = (props) => {
    const { logo = logoItem, showLogo = false } = props;
    const logoProps = {
        imgPath: logo,
        imgType: '',
        altText: 'test text',
        size: 'sml'
    };
    const Logo = logoItem && showLogo ? <ImageLoader {...logoProps} /> : null;

    return Logo;
};

export default Header;
