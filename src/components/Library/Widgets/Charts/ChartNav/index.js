import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";
import { defaultChartList } from "../config/defaultChartList";

/**
 * Simple UI Nav bar to enalbe click to change chart type
 * @param {*} props 
 * @returns 
 */
const ChartNav = (props) => {
    const { callback } = props;

    const chartList = defaultChartList;

    // todo: add logic 
    const TypeSelector = chartList.map((item) => {
        const { title } = item;
        const thisKey = makeUniqueKeyStr(title);
        return (
            <div
                className="nav-item"
                role="menuitem"
                key={thisKey}
            >
                <button
                    role="menuitem"
                    title={title}
                    className="nav-link"
                    href="#"
                    onClick={
                        () => callback(title)
                    }
                >
                    {item.title}
                </button>
            </div >
        )
    });

    const chartNav = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {TypeSelector}
                </ul>
            </div>
        </nav>
    );

    return chartNav;
};
export default ChartNav;