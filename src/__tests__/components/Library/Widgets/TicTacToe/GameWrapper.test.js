import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import GameWrapper from "components/Library/Widgets/Games/TicTacToe";

describe('components/Widgets/Games/TicTacToc', () => {
    test('<GameWrapper /> should render without error', () => {
        render(<GameWrapper />);
        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
    });

    // TODO: write tests for existence of Winner Notification
    // TODO: write tests for existence of Error Notification
    // TODO: write test for Reset button click event
});