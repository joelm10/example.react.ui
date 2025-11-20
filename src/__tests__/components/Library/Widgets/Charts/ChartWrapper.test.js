import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import ChartWrapper from "client/components/Library/Widgets/Charts";

describe('library/components/widgets/Charts', () => {
    test('<ChartWrapper /> should render succesfully', () => {
        render(
            <BrowserRouter>
                <ChartWrapper />
            </BrowserRouter>);
    });
});