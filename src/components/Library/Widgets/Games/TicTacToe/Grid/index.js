import '../styles/grid.css';

const GridWrapper = (props) => {
    const {
        callbacks: {
            clickHandler,
        },
        gameState,
        gameState: {
            currentPlayer, playerConfig
        }
    } = props;

    const GridItems = () => {
        const baseArray = gameState.grid;
        const items = baseArray.map((item) => {
            const { id: targetLocation, value: gridItemValue } = item;

            // add context of 'player', and pass to clickHandler
            const playerMove = playerConfig[currentPlayer].type;
            const { gameStatus: { winningMoves } } = gameState;
            const isWinMove = winningMoves?.indexOf(targetLocation);
            const isWinnerClass = !!isWinMove && isWinMove !== -1
                ? 'isWinner'
                : '';

            const gridClass = `col-4 gridItem ${isWinnerClass}`;

            const itemKey = targetLocation;
            return (
                <span
                    role="gridcell"
                    key={itemKey}
                    onClick={() => clickHandler(targetLocation, playerMove)}
                    className={gridClass}
                >
                    {gridItemValue}
                </span>
            );
        });

        return items;
    };

    const gridWrapper = gameState?.grid.length > 0
        ? (
            <div className="row gridWrapper">
                <GridItems />
            </div>
        ) : null;

    return gridWrapper;
};

export default GridWrapper;