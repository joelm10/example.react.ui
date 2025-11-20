import { winningGrid } from "../config/defaultGameSetup";

/**
 * Calculate if game has a winner
 * @param {array} gameState
 * @returns {object}
 */
export const checkWinner = (gameState) => {

    /**
     * Get current move per player
     * Filter source array to ONLY contain values matching predicate 'player' string
     * @param {array} arrayOfMoves 
     * @param {string} actualMoveValue 
     * @returns {array}
     */
    const getMoveByPlayer = (arrayOfMoves, actualMoveValue) => {
        return arrayOfMoves
            ?.filter((move) => {
                const filtered = move.value === actualMoveValue;
                return filtered;
            })
            .map((item) => {
                return item.id;
            });
    };

    // check for X or Y
    const movesX = getMoveByPlayer(gameState.grid, 'X');
    const movesO = getMoveByPlayer(gameState.grid, 'O');
    let winningMoves = null;
    // check current gamestate permutations against the winningGrid;
    const isGameWon = (player, targetMove) => {
        let isWin = false;

        let rowWinner = winningGrid.some((outerRow) => {
            if (outerRow) {
                const row = JSON.stringify(outerRow);
                const move = JSON.stringify(targetMove);
                // flag winning combination
                const isWinRow = row === move;
                if (isWinRow) {
                    winningMoves = move;
                }
                return row === move;
            }
            return isWin;
        });

        return rowWinner;
    };

    const player1 = isGameWon('1', movesX);
    const player2 = isGameWon('2', movesO);

    const gameWinner = (player1 && 'player 1') || (player2 && 'player 2');
    // no winner AND no available moves left
    const isDraw = !gameWinner && gameState.grid.filter((item) => {
        const { value } = item;
        return value === null;
    }).length === 0;

    const gameOver = isDraw || gameWinner;
    const winningResponse = {
        // needed for UI presentation of winning moves
        canPlay: !gameWinner && !isDraw,
        gameStatus: {
            outcome: (gameWinner && 'Won') || (isDraw && 'Draw'),
            winningMoves: winningMoves,
            winner: gameWinner,
            won: gameWinner,
            draw: isDraw,
            gameOver
        }
    };
    return winningResponse;
};