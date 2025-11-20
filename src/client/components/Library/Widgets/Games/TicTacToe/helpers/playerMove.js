/**
 * Updates the game state based on a player's move in a Tic-Tac-Toe game.
 * 
 * @param {string} move - The value to place on the grid (typically 'X' or 'O').
 * @param {number} targetLocation - The position on the grid where the move should be placed.
 * @param {Object} gameState - The current state of the game.
 * @param {Array<Object>} gameState.grid - Array of grid cell objects, each with id and value properties.
 * @param {boolean} gameState.canPlay - Whether moves can be made.
 * 
 * @returns {Object} The updated game state. If the move is invalid, returns the game state with 
 * canPlay set to false and errorPosition set to the invalid targetLocation.
 * If the move is valid, returns the updated grid with the new move and shouldMove set to true.
 */
const playerMove = (move, targetLocation, gameState) => {
    // Check if value is stored or not 
    let newGameState = gameState;
    const errorState = {
        ...gameState,
        canPlay: false,
        errorPosition: targetLocation ?? null
    }
    if (!targetLocation && parseInt(targetLocation)) {
        return errorState;
    }

    const isTargetLocationOpen = gameState?.grid.filter((obj) => {
        const isOpen = obj.id === targetLocation && obj.value === null;
        return isOpen;
    });
    // Check current location - if empty
    if (isTargetLocationOpen?.length === 1) {
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
    } else {
        newGameState = errorState;
    }
    return newGameState;
}

export default playerMove;