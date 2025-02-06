import { useEffect, useState } from "react";
import GridWrapper from "./Grid";
import { defaultGameSetup, valueTypes } from "./config/defaultGameSetup";
import logger from "helpers/utils/logging";
import Notification from "components/Library/Atomic/notification";

import { checkWinner } from "./helpers/checkWinner";
import togglePlayer from "./helpers/togglePlayer";

import playerMove from "./helpers/playerMove";

const GameWrapper = (props) => {
    const {
        gameTitle = 'Tic Tac Toe',
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

                const { canPlay, errorPosition } = newGameState;
                if (canPlay) {
                    try {
                        // Get next currentplayer move type - 0 or X
                        const nextCurrentPlayer = togglePlayer(playerMove, gameState.currentPlayer);
                        const newState = {
                            // update current player ref and config
                            ...newGameState,
                            currentPlayer: nextCurrentPlayer,
                            errorPosition: null
                        }
                        logger('info', `Player ${gameState.currentPlayer} played position ${targetLocation} `);

                        setGameState(newState);

                        return;
                    } catch (e) {
                        console.error(e);
                        logger('err', `ERROR: try set state er ${newGameState}`);
                    }
                }
                setGameState({
                    ...gameState,
                    errorPosition
                })
                logger('err', `Move not allowed to ${targetLocation}`);
                return;
            },
        },
        // TOOD: consider useContext()
        gameState
    };

    // Simple Game reset
    const Reset = () => {
        return (
            <button
                type="button"
                className="btn btn-success"
                onClick={() => setGameState(defaultGameSetup)}
                title="Reset">
                Restart Game
            </button>
        );
    };

    const errorNotification = (
        <Notification
            notificationType={'error'}
            showNotification={gameState.errorPosition !== null}
            notificationMessage={`Cant play in location ${gameState.errorPosition}`}
        />
    );
    const WinnerNotification = (
        <Notification
            showNotification={gameState.winner}
            notificationMessage={`Winner found -
            ${gameState.winner}`}
        />
    );

    const gameWrapper = (
        <div className="col-6">
            <h2>{gameTitle}</h2>
            {WinnerNotification}
            {errorNotification}
            <GridWrapper {...gridProps} />
            <Reset />
        </div>
    );

    return gameWrapper;
};

export default GameWrapper;