import togglePlayer from "client/components/Library/Widgets/Games/TicTacToe/helpers/togglePlayer";

describe('components/Widgets/Games/TicTacToc/helpers', () => {
    test('togglePlayer() should return 1 if no arguments passed', () => {
        const received = togglePlayer();
        expect(received).toEqual(1)
    });
    test('togglePlayer() should return 1 if number 2 is passed', () => {
        const received = togglePlayer(null, 2);
        expect(received).toEqual(1)
    });
    test('togglePlayer() should return 2 if number 1 is passed', () => {
        const received = togglePlayer(null, 1);
        expect(received).toEqual(2)
    });
});