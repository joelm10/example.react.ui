import '../grid.css';

const GridWrapper = (props) => {
    const {
        callbacks: {
            clickHandler,
        },
        config: {
            valueTypes,
            gridSize = 9
        }
    } = props;

    const GridItems = () => {
        const baseArray = Array.from(Array(gridSize).keys());
        const items = baseArray.map((item) => {
            const { value, itemKey } = item;
            const gridItemValue = valueTypes[value] ?? null;
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