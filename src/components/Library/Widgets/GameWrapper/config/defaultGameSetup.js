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

export const defaultGameSetup = {
    grid: defaultGrid,
    playerConfig: playerList,
    currentPlayer: 1,
};
