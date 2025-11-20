// ArticleWrapper.test.js
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ArticleWrapper from 'client/components/Library/Atomic/articles';
import getFromApi from 'client/services/network/api';

jest.mock('client/services/network/api', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve({
        // meta: { baseResponseKey: 'articles' },
        articles: [
            { id: 1, title: 'Test Article 1' },
            { id: 2, title: 'Test Article 2' },
            { id: 3, title: 'Test Article 3' },
            { id: 4, title: 'Test Article 4' },
            { id: 5, title: 'Test Article 5' },

        ]
    })),
    reject: jest.fn(() => Promise.resolve('API error'))
}));

const mockProps = {
    url: '/api/articles',
    meta: {
        baseResponseKey: 'articles',
        errorState: 'Error loading articles'
    },
    articleLimit: 12,
    pageTitle: 'Test Articles'
};

describe('ArticleWrapper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // TODO: Write out to handle loading state, asyc data fetch, error state then assert correctly
    test.skip(', should apply correct CSS class', async () => {
        render(<ArticleWrapper {...mockProps} />);
        await waitFor(() => {
            // screen.debug();
            expect(screen.getByRole('main')).toHaveClass('row');
        });
    });

    test.skip('handles API error gracefully', async () => {
        getFromApi.mockImplementationOnce(() => Promise.reject('API error'));

        render(<ArticleWrapper {...mockProps} />);

        await waitFor(() => {
            expect(screen.getByText('Error loading articles')).toBeInTheDocument();
        });
    });
});