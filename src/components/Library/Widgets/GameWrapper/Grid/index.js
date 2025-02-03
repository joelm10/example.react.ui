import '../grid.css';

const GridWrapper = (props) => {
    const {
        callbacks: {
            clickHandler,
        },
        config: {
            valueTypes,
        },
        gameState
    } = props;

    const GridItems = () => {
        const baseArray = gameState.grid;
        const items = baseArray.map((item) => {
            const { value, itemKey } = item;
            const gridItemValue = valueTypes[value] ?? null;
            // add context of 'player', and pass to clickHandler
            return (
                <span
                    key={itemKey}
                    onClick={() => clickHandler()}
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