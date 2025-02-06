import { winningGrid } from "../config/defaultGameSetup";

/**
 * Calculate if game has a winner
 * @param {array} gameState
 * @returns {object}
 */
export const checkWinner = (gameState) => {

    // TODO: consider making generic generator method
    // check for X
    const movesX = gameState.grid.filter((move) => move.value === 'X').map((item) => {
        return item.id;
    });
    // check for 0
    const movesO = gameState.grid.filter((move) => move.value === 'O').map((item) => {
        return item.id;
    });

    // check current gamestate permutations against the winningGrid;
    const isGameWon = (player, target) => {
        let isWin = false;

        let rowWinner = winningGrid.some((outerRow) => {
            if (outerRow) {
                const row = JSON.stringify(outerRow);
                const move = JSON.stringify(target);

                return row === move;
            }
            return isWin;
        });

        return rowWinner;
    };
    const player1 = isGameWon('1', movesX);
    const player2 = isGameWon('2', movesO);

    const gameWinner = (player1 && 'player 1') || (player2 && 'player 2');

    return {
        winner: gameWinner,
        canPlay: !gameWinner
    };
};
