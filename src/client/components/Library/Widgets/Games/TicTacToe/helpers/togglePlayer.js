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

export default togglePlayer;