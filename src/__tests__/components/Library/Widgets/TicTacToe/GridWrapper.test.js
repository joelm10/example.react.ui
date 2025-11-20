import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import GridWrapper from "client/components/Library/Widgets/Games/TicTacToe/Grid";
import { defaultGameSetup } from 'client/components/Library/Widgets/Games/TicTacToe/config/defaultGameSetup';

const testProps = {
    callbacks: {
        clickHandler: jest.fn()
    },
    gameState: {
        grid: [],
        currentPlayer: 1
    },
};

const testGrid = defaultGameSetup.grid;

describe('components/Library/widgets/<GridWrapper />', () => {
    test('should render nothing props passed', () => {
        const { container } = render(<GridWrapper {...testProps} />);

        expect(container).toBeEmptyDOMElement();
    });

    test('should render grid when grid array passed', () => {
        const validtestProps = {
            ...testProps,
            gameState: {
                ...defaultGameSetup,
                grid: testGrid
            }
        };
        render(<GridWrapper {...validtestProps} />);

        const gridItems = screen.getAllByRole('gridcell').length;
        expect(gridItems).toBe(testGrid.length);
    });

    test('should fire clickHandler when clicked', () => {
        const validtestProps = {
            ...testProps,
            gameState: {
                ...defaultGameSetup,
                grid: testGrid
            }
        };
        render(<GridWrapper {...validtestProps} />);
        const itemToClick = screen.getAllByRole('gridcell')[1];
        itemToClick.click();
        expect(validtestProps.callbacks.clickHandler).toHaveBeenCalled();
    });
});
