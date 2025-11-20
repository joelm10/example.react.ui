import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// core components
import AppBody from 'client/layout/appBody';
import Footer from 'client/layout/footer';
import Header from 'client/layout/header';

// TODO: Move to generic test folder
const getShouldAssert = (param) => `should render component ${param}`;

// simple render test with props
const componentList = [
    [
        getShouldAssert('Header'),
        Header,
        {
            showLogo:true
        },
        { role: 'img', class: '', altText: 'test text' },
    ],
    [
        getShouldAssert('footer'),
        Footer,
        { navElements: [] },
        { role: 'contentinfo', class: 'flex flex-col' }
    ],
    [
        getShouldAssert('AppBody'),
        AppBody,
        {},
        { role: 'main', class: 'flex flex-col' },
    ],
    // TOOD: Move to test in router-dom 
    // handle err:  useLocation() may be used only in the context of a <Router> component.
    // [
    //     getShouldAssert('ErrorComponent'),
    //     ErrorComponent,
    //     {},
    //     { role: 'main', class: 'flex flex-col' },
    // ],

];

describe('components/layout/', () => {
    test.each(componentList)('%s', (component, TestComponent, testProps, expected) => {
        render(
            <BrowserRouter>
                <TestComponent {...testProps} />
            </BrowserRouter>
        );

        let recieved = null;
        if (TestComponent === Header) {
            recieved = screen.getAllByAltText(expected.altText);
        } else {
            recieved = screen.getByRole(expected.role);
        }

        expect(recieved).not.toBeNull();
    })

})