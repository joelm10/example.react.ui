import playerMove from "components/Library/Widgets/Games/TicTacToe/helpers/playerMove";
import { defaultGameSetup } from "components/Library/Widgets/Games/TicTacToe/config/defaultGameSetup";
const testArgs = {
    move: 'X',
    targetLocation: null,
    gameState: {
        grid: defaultGameSetup.grid
    }
};

const testMockValid = {
    canPlay: false,
    errorPosition: null,
    grid: [
        { id: 0, value: null }, { id: 1, value: 'X' }, { id: 2, value: null }, { id: 3, value: null }, { id: 4, value: null }, { id: 5, value: null }, { id: 6, value: null }, { id: 7, value: null }, { id: 8, value: null }
    ]
}

describe('components/Widgets/Games/TicTacToc/helpers', () => {
    test('playerMove() should return error state if invalid arguments passed', () => {
        const received = playerMove();
        expect(received).toStrictEqual({ canPlay: false, errorPosition: null });
    });

    test('playerMove() should return same gameState IF targetLocation is available', () => {
        const { move, targetLocation, gameState } = testArgs
        gameState.grid[1] = {
            id: 1,
            value: 'X'
        };

        const testWithMoveState = {
            ...gameState,
        };

        const received = playerMove(move, targetLocation, testWithMoveState);

        expect(received).toStrictEqual(testMockValid)
    });

    // TODO: write test for error state IF target
    test.todo('playerMove() should return same gameState IF targetLocation NOT available');
});