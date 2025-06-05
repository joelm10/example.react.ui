import { useEffect, useState } from "react";
import GridWrapper from "./Grid";
import { defaultGameSetup, valueTypes } from "./config/defaultGameSetup";
import logger from "helpers/utils/logging";
import Notification from "components/Library/Atomic/notification";

import { checkWinner } from "./helpers/checkWinner";
import togglePlayer from "./helpers/togglePlayer";

import playerMove from "./helpers/playerMove";

/**
 * A component that wraps a Tic Tac Toe game and manages its state.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.gameTitle='Tic Tac Toe'] - The title of the game
 * @returns {JSX.Element} A game wrapper containing the game title, notifications, 
 * current player display, game status, grid, and reset button
 * 
 * @example
 * <GameWrapper gameTitle="My Tic Tac Toe Game" />
 * 
 * @description
 * This component manages the state of a Tic Tac Toe game including:
 * - Tracking player moves
 * - Toggling between players
 * - Checking for winners
 * - Displaying game status and notifications
 * - Allowing game reset
 */
const GameWrapper = (props) => {
    const {
        gameTitle = 'Tic Tac Toe',
    } = props;

    // setup game state - number of options, game play types, 
    const [gameState, setGameState] = useState(defaultGameSetup);
    useEffect(() => {
        // check if this move triggers game outcome
        const hasWinner = checkWinner(gameState);
        const { gameStatus, gameStatus: { gameOver, outcome } } = hasWinner;

        if (gameState.canPlay && !hasWinner.canPlay) {
            logger('info', 'Move not allowed');
            setGameState({
                ...gameState,
                canPlay: false,
                winner: hasWinner.winner,
                gameStatus: {
                    ...gameStatus
                }
            });
            return;
        } else if (gameStatus.draw && gameOver) {
            logger('info', `Game has ended.\nOutcome: ${outcome}`);
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
                        const nextCurrentPlayer = togglePlayer('', gameState.currentPlayer);
                        const newState = {
                            ...newGameState,
                            // update current player ref and config
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
            showNotification={!!gameState.gameStatus.winner && gameState.gameStatus.winner !== ''}
            notificationMessage={`Winner found -
            ${gameState.gameStatus.winner}`}
        />
    );
    const currentPlayerList = (
        <div>Current Player: {gameState.currentPlayer}</div>
    );

    const GameStatus = (props) => {
        const { winner, draw, won } = props;
        const isDraw = draw ? 'Draw' : '';
        let isWon = false;
        if (won && !draw) {
            isWon = `Won by ${winner}`
        } else if (!draw) {
            isWon = 'Active'
        }

        return (<div>Game Status: {isDraw} {isWon}</div>
        )
    };

    const gameWrapper = (
        <div className="col-6">
            <h2>{gameTitle}</h2>
            {WinnerNotification}
            {errorNotification}
            {currentPlayerList}
            <GameStatus {...gameState.gameStatus} />
            <GridWrapper {...gridProps} />
            <Reset />
        </div>
    );

    return gameWrapper;
};

export default GameWrapper;