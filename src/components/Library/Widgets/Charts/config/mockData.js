/**
 * @file Contains mock data and utility functions for chart component examples.
 */

import { getRandomNumbers, getRandomByLength } from '../../../../../helpers/utils/randoms';

/**
 * Creates an array of random bubble objects for bubble chart.
 * Each bubble has random x, y coordinates and radius r.
 * @param {number} dataSize - The number of bubbles to generate.
 * @returns {Array<{x: number, y: number, r: number}>} Array of bubble objects.
 */
const makeRandomBubbles = (dataSize) => {
    const min = 0;
    const max = 20;

    const bubbleArr = Array.from({ length: dataSize }, () => {
        return {
            x: getRandomNumbers(min, max),
            y: getRandomNumbers(min, max),
            r: getRandomNumbers(min, max),
        }
    });

    return bubbleArr;
};

/**
 * @constant {Array<Object>}
 * Mock dataset for general chart types (bar, line, etc.).
 * Contains a single dataset with random values, colors for background and borders.
 * Each dataset includes label, data points, styling properties for visualization.
 */
export const mockGeneralData = [
    {
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: getRandomByLength(6, 0, 20),
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
    },
];

/**
 * @constant {Object}
 * Mock data for bubble charts with random values.
 * Contains a dataset with bubble coordinates and sizes.
 */
export const mockBubbleData = {
    datasets: [{
        label: 'Sample Bubble data',
        data: [
            ...makeRandomBubbles(20)
        ],
        backgroundColor: 'rgb(255, 99, 132)'
    }]
};

/**
 * @constant {Object}
 * Mock data for scatter charts with predefined points.
 * Contains a dataset with x,y coordinates.
 */
export const mockScatterData = {
    datasets: [{
        label: 'Scatter Dataset',
        data: [{
            x: -10,
            y: 0
        }, {
            x: 0,
            y: 10
        }, {
            x: 10,
            y: 5
        }, {
            x: 0.5,
            y: 5.5
        }],
        backgroundColor: 'rgb(255, 99, 132)'
    }]
};

/**
 * @constant {Object}
 * Combined mock data for general chart configuration.
 * Contains labels and datasets for rendering charts.
 */
export const mockData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: mockGeneralData
};
