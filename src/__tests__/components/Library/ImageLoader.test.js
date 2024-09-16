import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImageLoader from '../../../components/Library/images/imageLoader';

const mockTest = {
    valid: {
        imgType: '', imgPath: 'thisTestPath.png', altText: 'test alt text', size: '', imgClass: 'testImgClass'
    },
    invalid: {
    }
};

describe('components/Library/<ImageLoader />', () => {
    test('should return null object, if no impPath passed ', () => {
        const { container } = render(<ImageLoader {...mockTest.invalid} />);

        expect(container).toBeEmptyDOMElement();
    });

    test('should render and show current path', () => {
        const { altText, imgPath, imgClass } = mockTest.valid;
        render(<ImageLoader {...mockTest.valid} />);

        const recieved = screen.getByRole('img');

        expect(recieved.src).toContain(imgPath);
        expect(recieved.alt).toContain(altText);
        expect(recieved.className).toContain(imgClass);
    });
});