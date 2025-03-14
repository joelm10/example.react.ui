import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import AppBody from "layout/appBody";

describe('Base Application', () => {
    test('<AppBody />, should render correctly', () => {
        render(
            <BrowserRouter>
                <AppBody />
            </BrowserRouter>
        );

    });
})