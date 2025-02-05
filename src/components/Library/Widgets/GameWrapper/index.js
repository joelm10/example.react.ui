import { useEffect, useState } from "react";
import GridWrapper from "./Grid";
import { defaultGameSetup, valueTypes, winningGrid } from "./config/defaultGameSetup";
import logger from "helpers/utils/logging";

/**
 * Bus logic of player move in game
 * @param {number} move 
 * @param {number} targetLocation 
 * @param {array} gameState 
 * @returns 
 */
const playerMove = (move, targetLocation, gameState) => {
    // Check if value is stored or not 
    let newGameState = gameState;
    const isTargetLocationOpen = gameState.grid.filter((obj) => {
        const isOpen = obj.id === targetLocation && obj.value === null;
        return isOpen;
    });
    // Check current location - if empty
    if (isTargetLocationOpen.length === 1) {
        const newValues = {
            id: targetLocation,
            value: move
        };
        // replace existing item in array, 
        const updatedGameState = gameState.grid.filter((item) => {
            const { id } = item;
            const ret = id !== targetLocation;
            return ret;
        }).concat(newValues);

        updatedGameState.sort((a, b) => a.id - b.id);

        newGameState = {
            ...gameState,
            grid: updatedGameState,
            shouldMove: true
        };
    };
    return newGameState;
}

/**
 * If player 1 is active, set player to 2 and vice versa
 * @param {*} playerList 
 * @param {*} currentPlayer 
 */
const togglePlayer = (playerList, currentPlayer) => {
    let newPlayer = 1;
    if (currentPlayer === 1) {
        newPlayer = 2;
    }

    return newPlayer;
}

/**
 * Calculate if game has a winner
 * @param {array} gameState 
 * @returns {object}
 */
const checkWinner = (gameState) => {

    // TODO: consider making generic generator method
    // check for X
    const movesX = gameState.grid.filter((move) => move.value === 'X').map((item) => {
        return item.id
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

const GameWrapper = (props) => {
    const {
        gameTitle = 'Game here',
    } = props;

    // setup game state - number of options, game play types, 
    const [gameState, setGameState] = useState(defaultGameSetup);
    useEffect(() => {
        // check if this move triggers game outcome
        const hasWinner = checkWinner(gameState);

        if (gameState.canPlay && !hasWinner.canPlay) {
            logger('info', 'Move not allowed');
            setGameState({
                ...gameState,
                canPlay: false,
                winner: hasWinner.winner
            });
            return;
        }
    }, [gameState]);

    const gridProps = {
        config: {
            valueTypes: valueTypes
        },
        callbacks: {
            clickHandler: (targetLocation, move) => {
                // can player move to this targetLocation
                const newGameState = playerMove(move, targetLocation, gameState);
                const { canPlay } = newGameState;
                if (canPlay) {
                    try {
                        // Get next currentplayer move type - 0 or X
                        const nextCurrentPlayer = togglePlayer(playerMove, gameState.currentPlayer);
                        const newState = {
                            // update current player ref and config
                            ...newGameState,
                            currentPlayer: nextCurrentPlayer
                        }
                        logger('info', `player ${gameState.currentPlayer} played ${targetLocation} `);

                        setGameState(newState);

                        return;
                    } catch (e) {
                        console.error(e);
                        logger('err', `ERROR: try set state er ${newGameState}`);
                    }
                }
                logger('err', `Move not allowed`);
                return;
            },
        },
        // TOOD: consider useContext()
        gameState
    };

    // Simple Game reset
    const Reset = () => {
        return (
            <button type="button" className="btn btn-success" onClick={() => setGameState(defaultGameSetup)} title="Reset">Restart Game</button>
        );
    };

    const WinnerNotification = () => gameState.winner && (
        <h5>
            Winner found -
            {gameState.winner}
        </h5>
    );

    const gameWrapper = (
        <div>
            <h2>{gameTitle}</h2>
            <WinnerNotification />
            <GridWrapper {...gridProps} />
            <Reset />
        </div>
    );

    return gameWrapper;
};

export default GameWrapper;