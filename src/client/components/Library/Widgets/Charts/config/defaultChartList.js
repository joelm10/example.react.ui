import { Doughnut, Bar, Pie, Line, PolarArea, Bubble, Radar } from 'react-chartjs-2';

export const defaultChartList = [
    // https://www.chartjs.org/docs/latest/charts/bar.html
    {
        component: Bar,
        title: 'bar',
        defaultOptions: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    },
    // https://www.chartjs.org/docs/latest/charts/doughnut.html
    {
        component: Doughnut,
        title: 'donut',
        defaultOptions: {}
    },
    {
        component: Pie,
        title: 'pie',
        defaultOptions: {}
    },
    // https://www.chartjs.org/docs/latest/charts/line.html
    {
        component: Line,
        title: 'line',
        defaultOptions: {}
    },
    // https://www.chartjs.org/docs/latest/charts/polar.html
    {
        component: PolarArea,
        title: 'polarArea',
        defaultOptions: {}
    },
    // https://www.chartjs.org/docs/latest/charts/bubble.html
    {
        component: Bubble,
        title: 'bubble',
        defaultOptions: {}
    },
    // https://www.chartjs.org/docs/latest/charts/bubble.html
    {
        component: Radar,
        title: 'radar',
        defaultOptions: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    },
    // https://www.chartjs.org/docs/latest/charts/scatter.html
    {
        component: Bar,
        title: 'scatter',
        defaultOptions: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    }
];


export const defaultArgs = {
    width: 400,
    height: 400,
    title: 'Chart Example'
};