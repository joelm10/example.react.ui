
import { generatePropsForChart } from "components/Library/Widgets/Charts/helpers/getChartByType";

const mockProps = {};
const expectedResp = {
    "data": {
        "datasets": [],
        "labels": []
    },
    "datasets": [],
    "labels": [],
    "options": {
        "plugins": {
            "legend": {
                "position": "top"
            },
            "title": {
                "display": true,
                "text": undefined
            }
        },
        "responsive": true
    }
};

describe('components/Library/Widgets/Charts/helpers', () => {
    test('generatePropsForChart() should return null when type not passed', () => {
        const received = generatePropsForChart();

        expect(received).toEqual({});
    });

    test('generatePropsForChart() should return chart type as passed', () => {
        const received = generatePropsForChart('pie', mockProps);

        expect(received).toEqual(expectedResp);
    });
});