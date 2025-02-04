import { useState } from "react";
import GridWrapper from "./Grid";
import { defaultGameSetup, valueTypes } from "./config/defaultGameSetup";
import logger from "helpers/utils/logging";
// MOVE TO HELPER FILE?
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

const winningGrid = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8]
    // columns
    [0, 3, 6], [1, 3, 7], [2, 5, 8]
    // diaginals
    [0, 4, 8], [2, 4, 6]
]

/**
 * Calculate if game has a winner
 * TODO: BUILD OUT with possible winning states
 * @param {array} gameState 
 * @returns 
 */
const checkWinner = (gameState) => {
    const isWin = false;
    const currentMoves = gameState.grid.filter((item) => item.value !== null);
    // check current gamestate permutations against the winningGrid;

    // check for X
    // check for 0
    return true;
};

const GameWrapper = (props) => {
    const {
        gameTitle = 'Game here',
    } = props;

    // setup game state - number of options, game play types, 
    const [gameState, setGameState] = useState(defaultGameSetup);

    const gridProps = {
        config: {
            valueTypes: valueTypes
        },
        callbacks: {
            // TODO: add business logic
            clickHandler: (targetLocation, move) => {
                // check if this move triggers game outcome
                const canMove = checkWinner(gameState);

                // can player move to this targetLocation
                const newGameState = playerMove(move, targetLocation, gameState);
                const shouldMove = newGameState.shouldMove;
                if (shouldMove && canMove) {
                    try {
                        // Get next currentplayer move type - 0 or X
                        const nextCurrentPlayer = canMove && togglePlayer(playerMove, gameState.currentPlayer);
                        const newState = {
                            // update current player ref and config
                            ...newGameState,
                            currentPlayer: nextCurrentPlayer
                        }
                        logger('info', `player ${gameState.currentPlayer} played ${targetLocation} `);

                        setGameState(newState);
                        return;
                    } catch (e) {
                        logger('err', `ERROR: try set state er ${newGameState}`);

                    }
                }
                logger('err', `Should not move ${newGameState}`);
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
    }
    const gameWrapper = (
        <div>
            <h2>{gameTitle}</h2>
            <GridWrapper {...gridProps} />
            <Reset />
        </div>
    );

    return gameWrapper;
};

export default GameWrapper;