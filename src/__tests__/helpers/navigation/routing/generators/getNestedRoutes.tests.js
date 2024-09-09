import getNestedRoutes from '../../../../../helpers/navigation/routing/generators/getNestedRoutes';

const mockNestedArray = [
    {
        label: 'array one',
        columns: [
            {
                id: 1,
                label: 'Flattest '
            },
            {
                id: 2,
                label: 'Fish'

            }
        ]
    },
    {
        label: 'array twp',
        columns: [
            {
                id: 1,
                label: 'Flattest 2'
            },
            {
                id: 2,
                label: 'Fish 2'

            }
        ]
    }
];
const mockFlatArray = [
    {
        id: 1,
        label: 'Flattest '
    },
    {
        id: 2,
        label: 'Fish'

    },
    {
        id: 1,
        label: 'Flattest 2'
    },
    {
        id: 2,
        label: 'Fish 2'

    }
];

describe('helpers/navigation/routing/generators',() => {
    test('getNestedRoutes() should flat map if array passed',() => {
        const recieved = getNestedRoutes(mockNestedArray, 'columns');
        expect(recieved).toEqual(mockFlatArray);
    });

    test('getNestedRoutes() should empty array if no array passed',() => {
        const recieved = getNestedRoutes();
        expect(recieved).toEqual([]);
    });
});