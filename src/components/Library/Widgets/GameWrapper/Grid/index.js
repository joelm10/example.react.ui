import '../grid.css';


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
            const { id, itemKey, value } = item;
            // add context of 'player', and pass to clickHandler
            const gridItemValue = value;

            const playerMove = playerConfig[currentPlayer].type;
            const targetLocation = id;
            return (
                <span
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

    const gridWrapper = (
        <div className="row gridWrapper">
            <GridItems />
        </div>
    );

    return gridWrapper;
};

export default GridWrapper;