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
            const { id, value } = item;
            // add context of 'player', and pass to clickHandler
            const gridItemValue = value;

            const playerMove = playerConfig[currentPlayer].type;
            const targetLocation = id;

            const itemKey = id;
            return (
                <span
                    role="gridcell"
                    key={itemKey}
                    onClick={() => clickHandler(targetLocation, playerMove)}
                    className="col-4 gridItem"
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