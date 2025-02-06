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