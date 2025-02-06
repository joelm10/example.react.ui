export const valueTypes = {
    x: 'X',
    o: 'O'
};
const playerList = {
    1: {
        title: 'player 1',
        type: valueTypes.x
    },
    2: {
        title: 'player 1',
        type: valueTypes.o
    }
};
const gridSize = 9;
const defaultGrid = Array.from(Array(gridSize)).map((_, index) => {
    return {
        id: index,
        value: null
    };
});

export const winningGrid = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // diaginals
    [0, 4, 8], [2, 4, 6]
];

export const defaultGameSetup = {
    canPlay: true,
    grid: defaultGrid,
    playerConfig: playerList,
    currentPlayer: 1,
    errorPosition: null
};
