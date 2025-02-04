import { useState } from "react";
import GridWrapper from "./Grid";

// TODO: move to config
const valueTypes = {
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

const gridSize = 9
const defaultGrid = Array.from(Array(gridSize)).map((_, index) => {
    return {
        id: index,
        value: null
    }
});

const defaultGameSetup = {
    grid: defaultGrid,
    playerConfig: playerList,
    currentPlayer: 1,
}
// ABOVE THS MOVE TO CONFIG


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

/**
 * Calculate if game has a winner
 * TODO: BUILD OUT with possible winning states
 * @param {array} gameState 
 * @returns 
 */
const checkWinner = (gameState) => {
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
                console.info('GameWrapper', targetLocation, 'move:', move);
                // check if this move triggers game outcome
                const canMove = checkWinner();

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
                        // console.info('TRY: try set state to', newGameState, nextCurrentPlayer);

                        setGameState(newState);
                        return;
                    } catch (e) {
                        console.error('ERROR: try set state err', newGameState)
                    }
                }
                console.error('Should not move', newGameState);
                return;

            },
        },
        // TOOD: consider useContext()
        gameState
    };

    const gameWrapper = (
        <div>
            <h2>{gameTitle}</h2>
            <GridWrapper {...gridProps} />
        </div>
    );

    return gameWrapper;
};

export default GameWrapper;