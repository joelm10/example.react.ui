import { useState } from "react";
import GridWrapper from "./Grid";

// TODO: move to config
const valueTypes = {
    x: 'X',
    o: 'O'
};
const gridSize = 9
const defaultGrid = Array.from(Array(gridSize).keys());;

// ABOVE THS MOVE TO CONFIG

const GameWrapper = (props) => {
    const {
        gameTitle = 'Game here',
    } = props;

    // setup game state - number of options, game play types, 
    const [gameState, setGameState] = useState({
        grid: defaultGrid
    });
    const gridProps = {
        config: {
            valueTypes: valueTypes
        },
        callbacks: {
            // TODO: add business logic
            clickHandler: (val) => {
                console.info('GameWrapper', val);
                // TODO: compose new updated value
                const newValues = {
                    [val]: val
                };
                const newGameState = {
                    ...gameState,
                    newValues
                };
                try {
                    console.info('try set state to', newGameState)

                    setGameState(newGameState);
                } catch (e) {
                    console.err('try set state err', newGameState)
                }
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