import makeUniqueKeyStr from "client/helpers/utils/string/makeUniqueKeyStr";
import { makeSentenceCase } from "../helpers/makeSentenceCase";
import getChartList from "../helpers/getChartList";

/**
 * Simple UI Nav bar to enalbe click to change chart type
 * @param {*} props 
 * @returns 
 */
const ChartNav = (props) => {
    const { callback, currentChart, navType = 'menu', chartList = getChartList() } = props;

    const TypeSelector = chartList.map((item) => {
        const { title } = item;
        const thisKey = makeUniqueKeyStr(title);
        const displayTitle = makeSentenceCase(title);
        const activeClass = title === currentChart ? 'active' : '';

        const menuMarkup = navType === 'menu' && (<div
            className={`nav-item ${activeClass}`}
            role="menuitem"
            key={thisKey}
        >
            <li
                role="button"
                title={title.toLowerCase()}
                className="nav-link button"
                href="#"
                onClick={
                    () => callback(title)
                }
            >
                {displayTitle}
            </li>
        </div >
        );
        const selectMarkup = navType === 'select' && (
            <option value={title}>
                {displayTitle}
            </option>
        );

        return navType === 'menu'
            ? menuMarkup
            : selectMarkup;
    });

    let chartNav = null;

    if (navType === 'menu') {
        chartNav = (
            <nav
                role="menu"
                className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {TypeSelector}
                    </ul>
                </div>
            </nav>
        )
    } else if (navType === 'select') {
        chartNav = (
            <nav role="menu">
                <h3>Select Graph Type</h3>
                <select
                    onChange={
                        (e) => {
                            const selection = e.target.value;
                            callback(selection);
                        }
                    }
                >
                    {TypeSelector}
                </select>
            </nav>
        );
    }

    return chartNav;
};

export default ChartNav;
