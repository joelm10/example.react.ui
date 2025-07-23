import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import AppBody from "layout/appBody";

delete global.window.location;
global.window = Object.create(window);

const cases = ['/home', '/about', '/engineering', '/game', '/chart'];

describe('Base Application', () => {
    beforeEach(() => {
        delete global.window.location;
        global.window = Object.create(window);
    });

    test.each(cases)(`<AppBody />, should render correctly when activePage IS set to %p]`,
        (testCase) => {
            global.window.location = { pathname: testCase };
            render(
                <BrowserRouter>
                    <AppBody />
                </BrowserRouter>
            );
        });
})